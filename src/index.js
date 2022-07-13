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
const kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.KafkaClient(),
    consumer = new Consumer(
        client,
        [
            { topic: 'tweets', partition: 0 }
        ],
        {
            autoCommit: false
        }
    );

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
        client.emit('event', message.value);
    });
})
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
        client.emit('tweets', change.fullDocument);
        console.log(`${sentimentPositives}:${sentimentNegatives}:${sentimentNeutral}`);
        client.emit('tweets2', {
            'Positive' : sentimentPositives,
            'Negative': sentimentNegatives,
            'Neutral': sentimentNeutral
        })
    })
})


// {
//     _id: {
//       _data: '8262CBF15E000000532B022C0100296E5A1004FFEBD402A7E44C66B454BF567F0AFAAD46645F6964006462CBF1B7B9D5C076D91C52060004'
//     },
//     operationType: 'insert',
//     clusterTime: new Timestamp({ t: 1657532766, i: 83 }),
//     fullDocument: {
//       _id: new ObjectId("62cbf1b7b9d5c076d91c5206"),
//       id: new Long("1546430579821858800"),
//       timeStamp: 'Some(1657532756177)',
//       tweet64: '98888!858888885 9888!858888885 887989\n' +
//         '172022  8888189887988\n' +
//         '272022  8989887988989\t8\n' +
//         '1072022  988988849\t8\n' +
//         '2022A9PAET\n' +
//         '\n' +
//         '9516 8\x0B888828!883988 201 8!858888885 ',
//       screen_name: 'bkkchangelog',
//       url_img: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
//       latitude: 13.81067591,
//       longitude: 100.73413141,
//       score: 0,
//       lang: 'th',
//       sentimentType: 'Neutral'
//     },
//     ns: { db: 'M001', coll: 'tweets' },
//     documentKey: { _id: new ObjectId("62cbf1b7b9d5c076d91c5206") }
//   }

const pipeline = [{
    $group: {
        _id: '$sentimentType',
        count: {
            $sum: 1
        }
    }
}]

// tweet.watch(pipeline).on('change', (change) => {
//     console.log(change);
// })


io.on('connection', (client) => {
    async function run() {
        let docs =  await tweet.aggregate(pipeline)
        client.emit('groupSentiment', docs);
    }
    run();
})





// async function run() {
//     let docs =  await tweet.aggregate(pipeline)
//     console.log(docs);
// }


// docs.length;
// })
// const topic = "tweets"
// const consume = async cb => {
//     await consumer.connect()
//     await consumer.subscribe({ topic: 'tweets', fromBeginning: true })
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message }) => {
//             console.log({
//                 value: message.value.toString(),
//             })
//         },
//     })
// }
// consume();
// io.on('connection', (client) => {
//     consumer.on('message', function (message) {
//         console.log(message);
//         console.log('test cai nha')
//         client.emit('event', message.value);
//     });


// })



server.listen(3000, () => {
    console.log('listening on port 3000 lan 2')
})



// , function() {
//     tweet.watch().on('change',(change)=>{
//         io.on('connection', function(client) {
//             client.emit('tweets', change.fullDocument);
//         })
//         console.log(change);
//     })
// }
