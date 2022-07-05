const Sentiment = require('../models/Sentiment')


class NewsController {


    /**
     * [GET] -> /home
     * @param {*} req 
     * @param {*} res 
     */
    home(req, res) {
        // res.render('news');
        Sentiment.find({}, function(err, sentiments) {
            if (!err) {
                res.json(sentiments);
            } else {
                res.status(400).json({error: err.message});
            }
        })
    }


    /**
     * [GET] -> /search
     * @param {*} req 
     * @param {*} res 
     */
    search(req, res) {
        res.send('DETAILS')
    }
}

module.exports = new NewsController;