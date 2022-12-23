const mongoose  = require("mongoose")

// const MONGOURL = require("./")

const connectDB = (url)=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
}
module.exports = connectDB