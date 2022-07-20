const express = require('express');
// create express instance
const app = express()
const http = require('http');
const server = http.createServer(app);

const { engine } = require('express-handlebars');
const path = require('path')

// socket io
const { Server } = require('socket.io')
const io = new Server(server)

// kafka configs
// const { Kafka } = require('kafkajs')
// const kafka = new Kafka({
//     clientId: 'twitter-retrieval-app',
//     brokers: ['localhost:9092', 'localhost:9093']
// })
// const consumer = kafka.consumer({ groupId: 'test-group' })

// create kafka instance
// Kafka consumer
const kafka = require('kafka-node');

const Consumer = kafka.Consumer,
    client1 = new kafka.KafkaClient(),
    consumer = new Consumer(
        client1,
        [
            { topic: 'tweets', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );


var Producer = kafka.Producer,
    KeyedMessage = kafka.KeyedMessage,
    client2 = new kafka.KafkaClient(),
    producer = new Producer(client2)


// database
const db = require('./config/db/mongdb');
// connect to db
db.connect();
// set path img
app.use(express.static(path.join(__dirname, 'public')));
// Templete engine
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

const route = require('./resources/routes')
route(app);

const tweet = require('C:/Users/nam.dinh/Desktop/study/big/src/resources/app/models/Sentiment.js')

io.on('connection', (client) => {
    consumer.on('message', function (message) {
        client.emit('tweets_FromKafka', message.value);
    });
})





io.on('connection', (socket) => {
    socket.on('text', function (text) {
        const payloads = [
            { topic: 'tweet', messages: text, partition: 0 },
        ];
        producer.send(payloads, function (err, data) {
            console.log(data);
        });
    })
})


//     socket.on('text', (msg) => {
//         const payloads = [
//             { topic: 'tweet', messages: 'hi', partition: 0 },
//         ];
//         producer.on('ready', function () {
//             producer.send(payloads, function (err, data) {
//                 console.log("HHAHA");
//             });
//         })
//     });
// })


io.on('connection', (client) => {
    var sentimentPositives = 0;
    var sentimentNegatives = 0;
    var sentimentNeutral = 0;
    tweet.watch().on('change', (change) => {
        if (change.fullDocument.sentimentType == 'Neutral') {
            sentimentNeutral += 1;
        }
        if (change.fullDocument.sentimentType == 'Positive') {
            sentimentPositives += 1;
        }
        if (change.fullDocument.sentimentType == 'Negative') {
            sentimentNegatives += 1;
        }
        client.emit('tweets_Worldmap', change.fullDocument);
        console.log(`${sentimentPositives}:${sentimentNegatives}:${sentimentNeutral}`);
        client.emit('tweets_columnChart', {
            'Positive': sentimentPositives,
            'Negative': sentimentNegatives,
            'Neutral': sentimentNeutral
        })
    })
})
const pipeline = [{
    $group: {
        _id: '$sentimentType',
        count: {
            $sum: 1
        }
    }
}]

io.on('connection', (client) => {
    async function run() {
        let docs = await tweet.aggregate(pipeline)
        client.emit('tweets_pieChart', docs);
    }
    run();
})

server.listen(3000, () => {
    console.log('listening on port 3000 lan 2')
})

