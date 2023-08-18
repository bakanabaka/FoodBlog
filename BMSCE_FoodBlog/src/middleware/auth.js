const jwt = require('jsonwebtoken');
const Note = require("../app");
const mongoose = require('mongoose');
const notesSchema = new mongoose.Schema({
    email: {
      type:String,
      // required:true,
      unique:true 
    },
    password: {
      type:String,
      // required:true,
      unique:true
    },
    confirmpassword: {
      type:String,
      // required:true
    },
    tokens:[{
      token:{
        type:String
      }
  
    }]
  })
//   notesSchema.methods.generateAuthToken = async function(){
//   try{
//     console.log(this._id);
//     const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
//     this.tokens = this.tokens.concat({token:token})
//     await this.save()
//     return token;
//   }
//   catch(error){
//     res.send("the error part" + error);
//     console.log("the error part" + error);
//   }
// }
//   notesSchema.pre("save", async function (next){
//     if(this.isModified("password")){
//       console.log(`the current password is ${this.password}`);
//       this.password = await bcrypt.hash(this.password, 10);
//       console.log(`the current password is ${this.password}`);
//       this.confirmpassword = undefined;
//     }
//     next() 
//   });

const auth = async(req,res,next) =>{
    try{
        const token = req.cookies.token;
        const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
        console.log(verifyUser);

        const user = await Note.findOne({_id:verifyUser._id})
        console.log(user);
        req.token = token;
        req.user = user; 
        next();
    }catch(error){
        res.status(401).send(error);
    }
}
module.exports = auth;