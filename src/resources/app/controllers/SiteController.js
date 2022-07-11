const Tweet = require('../models/Sentiment')




class SiteController {


    /**
     * [GET] -> /home
     * @param {*} req 
     * @param {*} res 
     */
    home(req, res) {
        // Tweet.find({}, function(err, sentiments) {
        //     if (!err) {
        //         res.json(sentiments);
        //     } else {
        //         res.status(400).json({error: err.message});
        //     }
        // })
        Tweet.find({})
            .then(tweets => res.render('home', {
                tweets: tweets,
            }))
            .catch(err => next(err));
        // Tweet.watch().on('change', (change) => {
        //     console.log(change.fullDocument);
        // })
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