const express = require('express');
// create express instance
const app = express()
const http = require('http')
const server = http.createServer(app)


// create kafka instance
const kafka = require('kafka-node');
// Kafka consumer
const Consumer = kafka.Consumer,
    client = new kafka.KafkaClient('localhost:9092'),
    consumer = new Consumer(client, [{ topic: 'tweets', partition: 0 }], { autoCommit: false });


const { engine } = require('express-handlebars');
const path = require('path')

// socket io
const { Server } = require('socket.io')
const io = new Server(server)




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


io.on('connection', (client) => {
    consumer.on('message', function (message) {
        console.log(message);
        client.emit('event', message.value);
    });

})

server.listen(3000, () => {
    console.log('listening on port 3000 lan 2')
})



