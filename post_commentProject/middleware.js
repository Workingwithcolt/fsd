const express = require('express')
const app = express()
const morgan = require('morgan')

const AppError = require('./AppError')

morgan('tiny')
// app.use(morgan('common'))
// app.use((req,res,next)=>{
//     console.log(req.method,req.path)
//     next()
// })
// app.use(morgan('tiny'))
// app.use((req,res,next)=>{
//     console.log("This is my first middleware")
//     next();
//     console.log("this is my first middleware after the callback")
//     //That middleware will execute at the last after executing all the middlewares 
//     // if U return the next then the statement after the next will not be 
//     // execute
// })
// app.use((req,res,next)=>{
//     console.log("This is my second middleware")
//     next();
// })

app.use(morgan('tiny'))

app.use((req,res,next)=>{
    req.requestTime = Date.now()
    console.log(req.method,req.path)
    next()
})

app.use('/dogs',(req,res,next)=>{
    console.log("I Love Dogs!!!")
    next()
})

const verifyPassword = (req,res,next)=>{
   const {password} = req.query;
   if(password === "chetan"){
    next();
   }else{
    // res.send("Sorry You Need a password")
    // throw new Error('Password required')
    throw new AppError('password required',401);
   }
}

app.get('/',(req,res)=>{
    console.log(`REQUEST DATE:${req.requestTime}`)
    res.send("Home Page")
})
app.get('/dogs',(req,res)=>{
    res.send('Woof Woof')
})
app.get('/error',(req,res)=>{
    chiken.fly();
  
})
app.get('/secret',verifyPassword,(req,res)=>{
    res.send("My secret i see the porn ")
})
app.use((req,res)=>{
    res.status(404).send('Not Found')
})
app.use((err,req,res,next)=>{
    console.log("***************************************")
    console.log("*****************ERROR*****************")
    console.log("***************************************")
    // res.status(500).send("OH BOY,WE GOT AN ERROR!!!")
    console.log(err)
    next(err)
})

app.listen(3000,()=>{
    console.log("App is running on localhost:3000")
})