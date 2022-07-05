// Using Node.js `require()`
const mongoose = require('mongoose');


const uri = "mongodb+srv://nam130599:nam130599@cluster0.ebeqc.mongodb.net/M001?retryWrites=true&w=majority";
// "mongodb+srv://nam130599:nam130599@cluster0.ebeqc.mongodb.net/M001.test_tweet"
//"mongodb+srv://nam13:<password>@clustername.mongodb.net/<dbname>?retryWrites=true&w=majority"

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("conncet sucessfully");
    } catch (e) {
        console.log("Error connecting")
    }

}

module.exports = {connect}