const Product = require('../models/product_model')
const {mutipleMongoseToObject,mongooseToObject} = require('../util/mongoose')

class productControllers{

    //trang chủ
    index(req,res,next){
        // res.render('index')

        Promise.all([Product.find({'sex':'female'}),Product.find({'sex':'male'})])
            .then(function([product, productMan]){
                return res.render('index',{
                    product: mutipleMongoseToObject(product),
                    productMan: mutipleMongoseToObject(productMan)
                })
            })
            .catch(next)
    }

    // //Trang blog
    // blog(req,res){
    //     res.render('blogs/blog')
    // }

    //Trang chi tiết blog
    blog_details(req,res){
        res.render('blog_details')
    }

    //Trang thanh toán
    check_out(req,res){
        res.render('check-out')
    }

    //Trang liên hệ
    contact(req,res){
        res.render('contact')
    }

    //Trang câu hỏi
    faq(req,res){
        res.render('faq')
    }

    //Trang đăng nhâp
    login(req,res){
        res.render('login')
    }

    //Trang đăng kí
    register(req,res){
        res.render('register')
    }

    //Trang chi tiết sản phẩm
    product(req,res,next){
        Product.findOne({'_id':req.params.id})
            .then(function(product){
                return res.render('product',{
                    product:mongooseToObject(product)
                })
            })
            .catch(next)
    }

    //Trang danh mục sản phẩm
    shop(req,res){
        res.render('shop')
    }

    //Trang giỏ hàng
    shopping_cart(req,res){
        res.render('shopping-cart')
    }

    //Trang tạo sản phẩm mới
    createProduct(req,res){
        res.render('createProduct')
    }

    //Nhận phương thức Post của trang tạo sản phẩm mới
    sendCreatedProduct(req,res,next){
        const data = req.body
        const product = new Product(data)
        product.save()
            .then(res.redirect('/'))
            .catch(next)
    }

    //Trang danh sách các sản phẩm đã tạo
    meProduct(req,res,next){
        if(req.isAuthenticated()){
            let productQuery=Product.find({})
            if(req.query.hasOwnProperty('_sort')){
                productQuery=productQuery.sort({
                    [req.query.column]:req.query.type
                })
            }
            Promise.all([ productQuery,Product.countDeleted()])
                .then(function([product,deleteCount]){
                    return res.render('meProduct',{
                        deleteCount,
                        product:mutipleMongoseToObject(product)
                    })
                })
                .catch(next)
        }
        else{
            res.redirect('/login')
        }

    }

    //Trang chỉnh sửa một sản phẩm
    editProduct(req, res,next) {
        Product.findById(req.params.id)
            .then(function(product){
                res.render('editProduct',{
                    product:mongooseToObject(product)
                })
            })
            .catch(next)
    }

    //Cập nhật một sản phẩm
    updateOneProduct(req,res,next){
        Product.updateOne({_id:req.params.id},req.body)
            .then(function(){
                res.redirect('/me_product')
            }
            )
            .catch(next)
    }

    //xóa mềm một sản phẩm
    deleteOneProduct(req,res,next){
        Product.delete({_id:req.params.id})
            .then(function(){
                res.redirect('/me_product')
            })
            .catch(next)
    }

    //Thùng khác chứa sản phẩm đã bị xóa mềm
    trashProduct(req,res,next){
        Product.findDeleted({})
            .then(function(product){
                return res.render('trashProduct',{
                    product:mutipleMongoseToObject(product)
                })
            })
    }

    //khôi phục sản phẩm bị Xóa mềm
    restoreProduct(req,res,next){
        Product.restore({_id:req.params.id})
            .then(()=> res.redirect('/me_product'))
            .catch(next)
    }

    //xóa vĩnh viễn
    deleteForeverProduct(req,res,next){
        Product.deleteOne({_id:req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //giỏ hàng
    cart(req,res,next){
        Product.findOne({_id:req.params.id})
            .then(function(product){
                req.session.product = product
                console.log(req.session.product)
                res.redirect('back',{

                })
            })
            .catch(next)
    }
}

module.exports = new productControllers