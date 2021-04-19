const Product = require('../models/product_model')
const {mutipleMongoseToObject,mongooseToObject} = require('../util/mongoose')

class BlogControllers{

    

    //Trang blog
    blog(req,res){
        res.render('blogs/blog')
    }

    //Trang chi tiết blog
    blog_details(req,res){
        res.render('blogs/blog-details')
    }

}

module.exports = new BlogControllers