const mongoose = require('mongoose')

const bcrypt = require("bcrypt")

const UsersData = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    gender:String,
    status:String,
    password:{
        type:String,
        require:true
    },
    product:[{
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
    }]
})

UsersData.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});
     
// UsersData.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };
  
UsersData.methods.comparePassword = function (candidatePassword) {
    if (this.password != null) {
      return bcrypt.compareSync(candidatePassword, this.password);
    } else {
      return false;
    }
  };

module.exports = mongoose.model("UserData",UsersData)