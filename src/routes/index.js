const productRoutes = require('./productRoutes')
const editProductRoutes = require('./editProductRoutes')
const blog = require('./blog')

function route(app){
    app.use('/edit',editProductRoutes)
    app.use('/blogs',blog)
    app.use('/',productRoutes)
    
}

// router.route('/private')
//         .get(function(req,res){
//             if(req.isAuthenticated()){
//                 res.send('Xin chao')
//             }
//             else{
//                 res.redirect('/nguoi-dung/dang-nhap')
//             }
//         })
// module.exports = router;

module.exports = route 