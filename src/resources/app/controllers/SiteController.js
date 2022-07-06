const Tweet = require('../models/Sentiment')




class SiteController {


    /**
     * [GET] -> /home
     * @param {*} req 
     * @param {*} res 
     */
    home(req, res) {
        // res.render('news');
        // Tweet.find({}, function(err, sentiments) {
        //     if (!err) {
        //         res.json(sentiments);
        //     } else {
        //         res.status(400).json({error: err.message});
        //     }
        // })
        Tweet.find({})
            .then(tweets => res.render('home'))
            .catch(err => next(err));
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

module.exports = new SiteController;