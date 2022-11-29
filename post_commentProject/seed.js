const mongoose = require('mongoose')

const Product = require('./models/campground')

mongoose.connect('mongodb://localhost:27017/yelp',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("MONGO CONNECTION OPEN !!!")
}).catch(err=>{
    console.log(err)
})

// const p = new Product({
//     name:'Ruby Grapefruit',
//     price:1.99,
//     category:'fruit'
// })
// p.save().then(p =>{
//     console.log(p)
// }).catch(e =>{
//     console.log(e)
// })

const seedProducts =[
        {title:"Molacha Odha",price:"120000",describe:"Beautiful",location:"Satara"}    
]
Product.insertMany(seedProducts).then(res =>{
    console.log(res)
}).catch(e=>{
    console.log(e)
})