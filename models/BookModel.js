const mongoose = require('mongoose');
// const shortid = require('shortid');
// const autoIncrement = require('mongoose-auto-increment');


// let counter = 1
// let CountId = {type:Number,default:()=>++counter}
//自动生成no

let BookSchema = new mongoose.Schema({
    no:{
        type:Number,
        default:0,
        // increment: true // 每次增加 1
        // start: 1000, // 从 1000 开始
        // max: 100000 // 最大值为 100000
    },
    title: {
        type:String,
        required: true
    },
    type: {
        type:String,
        default:"history"
    },
    author: String,
    publisher: String,
    status: {
        type:String,
        enum:['in lib','borrowed',"booked"],
        default:'in lib'
    }
});

let BookModel = mongoose.model('books',BookSchema)

module.exports = BookModel;
// autoIncrement.initialize(mongoose.connection())
// BookSchema.plugin(autoIncrement.plugin,{
//     model:'books',
//     field:'no',
//     startAt:1,
//     incrementBy:1
// })