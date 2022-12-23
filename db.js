const product = require('/workspaces/fsd/model/product.js')

require('dotenv').config()

const express = require("express")

const app = express()

app.use(express.static(__dirname + '/public'));

const path = require("path")

const methodOverride =require("method-override")

const {urlencoded} = require("express")

app.set('views',path.join(__dirname,"views"))

app.set('view engine',"ejs")

app.use(urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.use(express.json())

const connectDB = require("./db/db")

const controller = require("/workspaces/fsd/controller/controller.js")

const {usrdata} = controller  


data = usrdata

app.get('/home',(req,res)=>{
    res.render('index',{data})
})
app.post('/home',(req,res)=>{
    if(!req.body.logout){
        console.log("it is logout")
        data = null
        res.render("index")
    }
})

app.get('/home/product/jewellery',(req,res)=>{
    res.render('jewellery',{data})
})
app.get('/home/product/jewellery/:item',(req,res)=>{
    console.log(res.body)
    res.render('products')
})
app.get("/home/product/fashion",(req,res)=>{
    res.render("fashion",{data})
})

app.get("/home/product/electronic",(req,res)=>{
    res.render("electronic",{data})
})

app.get('/home/users',(req,res)=>{
    res.render('login')
})

app.post('/home/users',controller.create)
// app.get('/home/users',controller.find)
app.put('/home/users/:id',controller.update)
app.delete('/home/users/:id',controller.delete)

const port = process.env.port || 3001


const start = async()=>{
    try{
        await connectDB(process.env.MONGOURL)
        console.log("it is running")
        app.listen(port,()=>{
            console.log(`server is running...${port}`)
        })
    }catch(e){
        console.log(e)
    }
}


start()