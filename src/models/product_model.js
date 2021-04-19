const mongoose = require('mongoose');
const { ObjectID } = require('mongoose/lib/schema/index');
const Schema = mongoose.Schema;
const mongoose_delete = require('mongoose-delete')

const Product = new Schema({
    // _id:{type:ObjectID},
    name: { type: String ,maxLength:255},
    price: { type: String ,maxLength:255},
    description:{type: String,maxLength: 600},
    image:{type: String,maxLength: 255},
    sex: { type: String ,maxLength:255}
  },{
    timestamps:true,
  });

Product.plugin(mongoose_delete,{ deletedAt : true ,overrideMethods: 'all'})
module.exports = mongoose.model('Product',Product);