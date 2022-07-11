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




const tweet = require('/home/nam-pc/Desktop/source code/FE_REALTIME/src/resources/app/models/Sentiment.js')

// tweet.watch().on('change',(change)=>{
//     io.on('connection', (client) => {
//         console.log('push sucessfully')
//         client.emit('tweets', change.fullDocument);
//     })
//     console.log(change.fullDocument);
// })

io.on('connection', (client) => {
    consumer.on('message', function (message) {
        client.emit('event', message.value);
    });
})
io.on('connection', (client) => {
    tweet.watch().on('change', (change) => {
        console.log('push sucessfully')
        client.emit('tweets', change.fullDocument);
    })
})



// async function run() {
//     let docs =  await tweet.aggregate([
//         {
//             $group: {
//                 _id: '$sentimentType',
//                 count: {
//                     $sum: 1
//                 }
//             }
//         }
//     ])
//     docs.length;
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
