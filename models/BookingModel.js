const mongoose = require('mongoose');
const {ObjectId} = require("mongodb");

let BookingSchema = new mongoose.Schema({
    no:Number,
    username:String,
    booking_date:Date,
    booking_return:Date,
    title: {
        type:String,
        required: true
    },
    author: String,
    booking_seq:Number,
    status: {
        type:String,
        enum:['in lib','borrowed',"booked"]
    }
});

let BookingModel = mongoose.model('booking',BookingSchema)

module.exports = BookingModel;