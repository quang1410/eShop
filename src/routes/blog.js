var express = require('express')
var router = express.Router()

const blogController = require('../controllers/BlogControllers')

router.get('/blog',blogController.blog)
router.get('/blog_details',blogController.blog_details)

module.exports = router