const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    discount_percent:{
        type:Number,
    },
    new_price:{
        type:Number,
        required:true,
    },  
})

const Products = mongoose.model('product', productSchema)
module.exports = Products;