const express = require('express')
const kafka = require('kafka-node');
const app = express()
const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')

const Consumer = kafka.Consumer,
    client = new kafka.KafkaClient('localhost:9092'),
    consumer = new Consumer(client, [ { topic: 'tweets', partition: 0 } ], { autoCommit: false });


const io = new Server(server)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

io.on('connection', (client) => {
    // console.log('user connected')
    // socket.on('chatMessage', data => {
    //     io.emit('data', data) // send data to all users connected
    // })
    consumer.on('message', function (message) {
        console.log(message);
        client.emit('event', message.value);
    });

})


server.listen(3000, () => {
    console.log('listening on port 3000 lan 2')
})

