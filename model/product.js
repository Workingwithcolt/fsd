const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    productname:String,
    price:Number,
    image:String,
    isSell:{type:Boolean,
    default:false
    },
    category:String,
    dateofpurchase:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Product',ProductSchema)
