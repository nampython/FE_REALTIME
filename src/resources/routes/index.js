const siteRouter = require('./sites.route')

function route(app) {


    app.use('/', siteRouter);

    // app.get('/news', (req, res) => {
    //     res.render('news')
    // })

}

module.exports = route;