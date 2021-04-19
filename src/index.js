const express = require('express')
const  morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const hbs  = require('express-handlebars')
const path = require('path')
const route = require('./routes/index')
const db = require('./config/db/index')
const methodOverride = require('method-override')
const sortMiddleware = require('./middleware/sortMiddleware')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')


const app = express()

//override method action in forms
app.use(methodOverride('_method'))

//sort
app.use(sortMiddleware)

/* Khai báo để sử dụng kịch bản passport */
require('./config/passport');

/* Cấu hình passport */
app.use(session({
    secret : 'secured_key',
    resave : false,
    saveUninitialized : false
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//static files
app.use(express.static(path.join(__dirname, 'public')))
 
// parse application/json
app.use(bodyParser.json())

//template engine
app.engine('.hbs', hbs({extname: '.hbs',
// Specify helpers which are only registered on this instance.
helpers: {
    sum: function (a,b) { return a+b },
    sortable : (field,sort) => {

        const sortType = field === sort.column ? sort.type : 'default'
    
        const icons = {
          default : 'fas fa-sort',
          asc:'fas fa-sort-amount-up',
          desc:'fas fa-sort-amount-down'
        }
    
        const types = {
          default : 'desc',
          asc : 'desc',
          desc : 'asc'
        }
    
        const icon = icons[sortType]
        const type = types[sortType]
    
        return `<a href="/me_product?_sort&column=${field}&type=${type}" class="prevent_default"><i class="${icon}"></i></a>`
    }
}
    
}))
app.set('view engine', '.hbs')
app.set('views',path.join(__dirname,'resources/views'))//set views

//HTTP logger
app.use(morgan('dev'))

//Routes
route(app)

//connect mongoDB
db.connect()


app.listen(3000,function(){
    console.log('http://localhost:3000')
})