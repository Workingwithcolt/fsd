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