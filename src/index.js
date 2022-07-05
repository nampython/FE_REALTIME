const express = require('express');
const kafka = require('kafka-node');
const app = express()
const http = require('http')
const server = http.createServer(app)
const { engine } = require ('express-handlebars');
const path = require('path')

const {Server} = require('socket.io')
const io = new Server(server)

const route = require('./resources/routes')

// database
const db = require('./config/db/mongdb');


// connect to db
db.connect();

// const Consumer = kafka.Consumer,
//     client = new kafka.KafkaClient('localhost:9092'),
//     consumer = new Consumer(client, [ { topic: 'tweets', partition: 0 } ], { autoCommit: false });

// set path img
app.use(express.static(path.join(__dirname, 'public')));


// Templete engine
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));


route(app);


// io.on('connection', (client) => {
//     // console.log('user connected')
//     // socket.on('chatMessage', data => {
//     //     io.emit('data', data) // send data to all users connected
//     // })
//     // consumer.on('message', function (message) {
//     //     console.log(message);
//     //     client.emit('event', message.value);
//     // });

// })

server.listen(3000, () => {
    console.log('listening on port 3000 lan 2')
})

