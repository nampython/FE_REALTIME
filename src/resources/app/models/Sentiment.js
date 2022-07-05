// Using Node.js `require()`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sentimentSchema = new Schema({
    id: String,
    timeStamp: String,
    tweet64: String,
    location: String,
    score: String
});

module.exports = mongoose.model('test_tweet', sentimentSchema);