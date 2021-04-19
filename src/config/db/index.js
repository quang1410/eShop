// Using Node.js `require()`
const mongoose = require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/e_shop', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true      
    });
    console.log('Connect Successfully!')
    }
    catch (error) {
        console.log('Connect failure');
    }
}

module.exports = {connect};