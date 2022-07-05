class NewsController {


    /**
     * [GET] -> /news
     * @param {*} req 
     * @param {*} res 
     */
    index(req, res) {
        res.render('news');
    }


    /**
     * 
     */
    show(req, res) {
        res.send('DETAILS')
    }
}

module.exports = new NewsController;