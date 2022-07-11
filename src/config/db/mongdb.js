// Using Node.js `require()`
const mongoose = require('mongoose');
const tweet = require('C:/Users/nam.dinh/Desktop/study/big/src/resources/app/models/Sentiment.js')

const express = require('express');
const uri = "mongodb+srv://nam130599:nam130599@cluster0.ebeqc.mongodb.net/M001?retryWrites=true&w=majority";
// "mongodb+srv://nam130599:nam130599@cluster0.ebeqc.mongodb.net/M001.test_tweet"
//"mongodb+srv://nam13:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("conncet MongoDB sucessfully");
    } catch (e) {
        console.log("Error connecting")
    }

}
// , function() {
//     tweet.watch().on('change',(change)=>{
//         io.on('connection', function(client) {
//             client.emit('tweets', change.fullDocument);
//         })
//         console.log(change);
//     })
// }
// , function(err) {
//     tweet.watch().on('change',(change)=>{
//         io.on('connection', function(client) {
//             client.emit('tweets', change.fullDocument);
//         })
//         console.log(change.fullDocument);
//     })
// }
module.exports = {connect}