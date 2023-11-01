const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
    old_price:{
        type:Number,
    },
    ratings:{
        type:String,
    },
    
})

const Products = mongoose.model('product', productSchema)
module.exports = Products;