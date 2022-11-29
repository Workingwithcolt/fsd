const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const CampgroundSchema = new Schema({
    post_title:String,
    username:String,
    post_info:String,
    created_at: {type: String, default: Date.now},
    comments:[
        {
             comment_user_name:String
            ,comment:String,
            date:{type:String,default:Date.now}
    },
    
],
    like:{ type: Number, default: 0 }
})



module.exports = mongoose.model('Campground',CampgroundSchema);