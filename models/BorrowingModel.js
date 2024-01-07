const mongoose = require('mongoose');

let BorrowingSchema = new mongoose.Schema({
    no:Number,
    username:String,
    borrow_date:Date,
    return_date:Date,
    is_returned:Boolean,
    is_late:Boolean,
    title: String,
    status: {
        type:String,
        enum:['borrowing','late','returned'],
        default:'borrowing'
    }
});

let BorrowingModel = mongoose.model('borrowing',BorrowingSchema)

module.exports = BorrowingModel;