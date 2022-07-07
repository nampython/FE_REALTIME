// Using Node.js `require()`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const sentimentSchema = new Schema({
    id: Number,
    timeStamp: String,
    tweet64: String,
    screen_name: String,
    url_img: String,
    latitude: Number,
    longitude: Number,
    score: Number,
    lang: String
});


module.exports = mongoose.model('Tweet', sentimentSchema);