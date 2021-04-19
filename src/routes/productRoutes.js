var express = require('express')
var router = express.Router()
var passport = require('passport');

const productController = require('../controllers/productControllers')

router.get('/',productController.index)
router.get('/trash-product',productController.trashProduct)
router.patch('/restore/:id',productController.restoreProduct)
router.put('/update/:id',productController.updateOneProduct)
router.get('/product/:id',productController.product)
router.get('/cart/:id',productController.cart)
router.delete('/delete-forever/:id',productController.deleteForeverProduct)
router.delete('/delete/:id',productController.deleteOneProduct)
router.get('/create_product',productController.createProduct)
router.post('/create_product',productController.sendCreatedProduct)
router.get('/me_product',productController.meProduct)
// router.get('/blog',productController.blog)
router.get('/blog_details',productController.blog_details)
router.get('/check_out',productController.check_out)
router.get('/contact',productController.contact)
router.get('/faq',productController.faq)
router.get('/login',productController.login)
router.post('/login',passport.authenticate('local.login', { 
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true }))
router.get('/register',productController.register)
router.post('/register',passport.authenticate('local.register', { 
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true }))
router.get('/shop',productController.shop)
router.get('/shopping_cart',productController.shopping_cart)

module.exports = router 