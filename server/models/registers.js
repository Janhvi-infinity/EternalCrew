const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const employeeSchema = new Schema({
    username : {
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true,
        unique:true
    },
    password :{
        type:String,
        required:true
    },
});

//token generation
employeeSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        // * not saving the token inside the DB
        //console.log(token);
        // this.tokens = this.tokens.concat({token:token});
        // await this.save();
        return token;

    } catch (error){
          res.send("the error part");
          console.log("the error part");
    }
}


// Hashing of password
employeeSchema.pre("save", async function(next) {
    
    if(this.isModified("password")){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})



// const Register = new mongoose.model("Table1", employeeSchema);
module.exports = mongoose.model('register', employeeSchema );