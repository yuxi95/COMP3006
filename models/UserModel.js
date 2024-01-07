const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    // id:Number,
    name:{
        type:String,
        required:true
    },
    username: {
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role: {
        type:String,
        default:"user",
        enum:['user','admin']
    },
    student_id:{
        type:Number,
        required:true,
        unique:true
    },
    mobile_phone: {
        type:String,
        required:true
    },
    academy: {
        type:String,
        required:true
    },
    status: {
        type:String,
        enum:['active','passed']
    }
});

let UserModel = mongoose.model('users',UserSchema)

module.exports = UserModel;