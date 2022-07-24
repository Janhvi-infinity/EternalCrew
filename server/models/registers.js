const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

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
    password2 : {
        type: String,
        required:true
    }

});


// Hashing of password
employeeSchema.pre("save", async function(next) {
    
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);

        // this.password2 = undefined;
    }

    next();
})

// now we need to create a collection

// const Register = new mongoose.model("Table1", employeeSchema);
module.exports = mongoose.model('registers', employeeSchema );