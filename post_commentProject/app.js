const express = require('express')
const mongoose = require("mongoose")
const methodOverride= require('method-override')
const ejsMate = require('ejs-mate')
const Campground = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/Post',{useNewUrlParser:true,useUnifiedTopology:true})
const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('CONNECTION OPEN!!!')
});

// connection to mongodb

const path = require('path')
const app = express()
app.engine('ejs',ejsMate)
app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended:true}))

app.use(methodOverride('_method'))
// we install the method override because of the put patch delete


app.get('/post',async(req,res)=>{
    const campground = await Campground.find({});
    // console.log(campground[0]])
    
    res.render('home',{campground})
})



app.get('/campgrounds/new',(req,res)=>{
    res.render('campground/new')
})

app.get('/post/:id',async(req,res)=>{
    const post = await Campground.findById(req.params.id)
    res.render('campground/show',{post})
})

app.put('/post/:id',async(req,res)=>{
    const {user,comment} = req.body;
    const [onlyDate] = new Date().toISOString().split('T');
    const comment_obj= {
        comment_user_name:user,
        comment:comment,
        date:onlyDate
    }
    const post = await Campground.findById(req.params.id)
    await post.comments.push(comment_obj)
    await post.save()          
    res.redirect(`/post/${req.params.id}`)
})
app.patch('/post/:id',async (req,res)=>{
    const post = await Campground.findById(req.params.id)
    post.post_title = req.body.title;
    post.post_info  = req.body.description
    await post.save()
    res.render(`campground/show`,{post})
})

app.post("/post/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, theUser) {
        if (err) {
            console.log(err);
        } else {
            theUser.like += 1;
            theUser.save();
            res.redirect(`/post`); //something like this...
        }
    });
});


app.get('/post/:id/edit',async(req,res)=>{
    const post = await Campground.findById(req.params.id)
    res.render('campground/edit',{post})
})

app.get('/post/:id/comment',async(req,res)=>{
    // we get the name and other info after login
    const post = await Campground.findById(req.params.id)
    res.render('campground/comment',{post})
})

app.put('/campgrounds/:id',async(req,res)=>{
    const {id} = req.params;
    console.log(req.params)
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground})
    console.log(campground)
    res.redirect(`/campgrounds/${campground._id}`)
})
app.delete('/post/:id',async (req,res)=>{
    const {id}= req.params;
    await Campground.findByIdAndDelete(id)
    res.redirect('/post')
})

app.listen(3000,()=>{
    console.log("Serving the Port 3000")
})

