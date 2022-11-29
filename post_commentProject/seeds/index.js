const mongoose = require("mongoose")
const cities = require('./cities')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/Post',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('CONNECTION OPEN!!!')
});
const [onlyDate] = new Date().toISOString().split('T');
const array = [
    {
        post_title:"Mental_health",
        username:"Chetan",
        post_info:"The health is important and it is ",
        created_at:onlyDate,
        comments:[
            // comment_user_name:String,comment:String
            {
                comment_user_name:"Sakshi",
                comment:"You are lovely i like U babe",
                date:onlyDate
            },
            {
                comment_user_name:"Sakshi",
                comment:"You are lovely i like U babe",
                date:onlyDate
            }
        ]
        ,
        like:12
    },
    {
        post_title:"Life",
        username:"yuvraj",
        post_info:"Life is the kind of thing where we can do anything that we want ",
        created_at:onlyDate,
        comments:[
            {
                comment_user_name:"Sakshi",
                comment:"You are lovely i like U babe",
                date:onlyDate
            },
            {
                comment_user_name:"Sakshi",
                comment:"You are lovely i like U babe",
                date:onlyDate
            }
        ],
        like:412
    }
]

const seedDB = async()=>{
    await Campground.deleteMany();
    for(let i=0;i<2;i++){
        const camp = new Campground({
            post_title:array[i].post_title,
            username:array[i].post_username,
            post_info:array[i].post_info,
            created_at: array[i].created_at,
            comments:array[i].comments,
            like:array[i].like
        })
        await camp.save();
        const s = {
            comment_user_name:"Maish",
            comment:"You are lovely i like U babe",
            date:onlyDate
        }
        console.log(camp.comments.push(s))
        console.log(camp.comments)
    }
}
seedDB()