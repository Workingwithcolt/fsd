const UserData = require("/workspaces/fsd/model/users.js")
const bcrypt = require("bcrypt")
// import bcrypt from 'bcryptjs';
// let user = await model.findOneUser({ email: this.req.body.email});
// if (user == null) {
//     return sendResponse(this.res, 400, FAILED_MSG, 'Incorrect id or password.');
// }

// let isValidPassword = await bcrypt.compare(this.req.body.password, user.password);
// if (!isValidPassword) {
//     return sendResponse(this.res, 400, FAILED_MSG, 'Incorrect id or password.');
// }
//create and save new user
var usrdata = {}

exports.create = async (req,res)=>{
    
    if(!req.body.full_name){
    const user_exist = req.body.email
    const exist = await UserData.find({ email: req.body.email});
    //validate the request
    if(!exist){
        return await res.send({message:"the data is present",exist});
    }
    if(!req.body){
        res.status(400).send({message:"Content is not present"})
        return
    }

    //new user
    const user = new UserData({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        gender:req.body.gender,
        status:req.body.status
    })

    console.log(user)
    
    
    //save the user in the database
    try{
       const data =  await user.save(user)
       res.render('index',{data})
    }catch(e){
        res.status(500).send({
            message:"some error is happen during creation of the user try again"
        })
    }
}else if(req.body.logout){
    console.log("it is executed")
    res.redirect('/home')
}else{
    try{
        usrdata = await UserData.findOne({email:req.body.email})
        // console.log("it is password")
        // console.log(usrdata)
        // console.log(req.body.password)
        // let isValidPassword = await bcrypt.compare(this.req.body.password, usrdata.password);
        // if (!isValidPassword) {
        //     return sendResponse(this.res, 400, FAILED_MSG, 'Incorrect id or password.');
        // }
        // if(usrdata.password === req.body.password){    
        usrdata.comparePassword(req.body)
        data = usrdata
        console.log(data+"is it")
        res.render('index',{data})
        }
    catch(e){
        res.status(500).send({message:"Password is not correct"})
    }
}
}


//retreive and return the all users

// exports.find = async(req,res)=>{
    
//     try{
//         const data = await UserData.find({email:req.body.email})
//         console.log("the data is present")
//         res.redirect('/home')
//     }catch(e){
//         res.status(500).send({message:e.message || "Error Occure while retreiving the information"})
//     }
    
// }

//Update a new identify by userid

exports.update = async (req,res)=>{
    if(!req.body){
        return res.status(400).send({message:"Data Does not present!!"})
    }
    const id  = req.params.id
    const data = await UserData.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    try{
        if(!data){
            res.status(400).send({message:`Cannot update the user with ${id} Maybe user not present `})
        }else{
            return res.send(data) 
        }
    }catch(e){
        res.status(500).send({message:"Error Update user information"})
    }
    
}

//Delete the user by specifying the id

exports.delete = async (req,res)=>{
    const id = req.params.id
    try{
        const data = await UserData.findByIdAndDelete(id)
        if(!data){
            res.status(404).send({message:`Cannot delete the data of the id ${id} `})
        }else{
            res.send({message:"User was successfully deleted"})
        }
    }catch(e){
        res.status(500).send({message:`Can't delete the user of the id ${id}`})

    }
    
}
exports.usrdata