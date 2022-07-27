const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const InstituteSchema = new Schema({
    institutename : {
        type:String,
        required:true
    },
    institutecode :{
        type:String,
        required:true,
        //unique:true
    },
    universityname :{
        type:String,
        required:true
    },
    course : {
        type: String,
        enum: ["course1","course2","course3"],
        required:true
    },
    address : {
        type: String,
        required:true
    },
    state : {
        type: String,
        enum: ["state1","state2","state3"],
        required:true
    },
    city : {
        type: String,
        enum: ["city1","city2","city3"],
        required:true
    },
    pincode : {
        type: String,
        required:true
    },
    email : {
        type: String,
        required:true
    },
    password : {
        type: String,
        required:true
    },
    password2 : {
        type: String,
        required:true
    }, 
    tokens : [{
        token:{
            type: String,
            required:true
        }
    }]

});

// //token generation
InstituteSchema.methods.generateAuthToken = async function(){
    try {
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        //console.log("Generated token:  " + token);
        this.tokens = this.tokens.concat({token});
        //console.log("Token added to schema");
        await this.save();
        //console.log("Token saved to schema");
        return token;

    } catch (error){
          res.send("the error part");
          console.log("the error part");
    }
}


//Hashing of password
InstituteSchema.pre("save", async function(next) {
    
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);

        // this.password2 = undefined;
    }

    next();
})

// now we need to create a collection

// const Register = new mongoose.model("Table1", employeeSchema);
module.exports = mongoose.model('insti_register', InstituteSchema );