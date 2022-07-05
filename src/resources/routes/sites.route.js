const express = require('express');
const router = express.Router();



var siteController = require('../app/controllers/SiteController')

router.get('/:slug', siteController.home)
router.get('/', siteController.home)



module.exports = router;