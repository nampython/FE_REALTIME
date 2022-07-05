// Using Node.js `require()`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

// const Sentiment = new Schema({
//     _id: ObjectId,
//     id: String,
//     timestamp: String,
//     tweet64: String,
//     location: String,
//     score: String
// });


const SentimentSchema = new Schema({
    hashtag: String,
});
module.exports = mongoose.model('Test', SentimentSchema);