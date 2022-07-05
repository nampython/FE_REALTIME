
const newRouter = require('./news.route')
const siteRouter = require('./sites.route')

function route(app) {



    app.use('/news', newRouter);

    app.get('/', siteRouter);

    // app.get('/news', (req, res) => {
    //     res.render('news')
    // })

}

module.exports = route;