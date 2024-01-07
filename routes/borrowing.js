var express = require('express');
var router = express.Router();
const BorrowingModel = require('../models/borrowingModel');
// var BookModel = require('../models/bookModel');
const checkLogin = require('../midware/checkLoginMiddleware');

router.get('/borrow',checkLogin, async function (req, res, next) {
    // const borrowing = await BorrowingModel.find();

    // let borrowed_book = await BookModel.findOne({no: req.query.no, title: req.query.title},{status: 1});
    // if(borrowed_book.status !== 'in lib'){
    //     res.send('Book is not available');
    //     return;
    // }
    let borrow_date = new Date();
    let return_date = new Date();
    return_date.setDate(borrow_date.getDate() + 7);
    console.log(req.session.username)
    try {
        const borrow_record = await BorrowingModel.create({
            no: req.query.no,
            username: req.session.username,
            borrow_date,
            return_date,
            is_returned: false,
            is_late: false,
            title: req.query.title
        })
        res.status(200).send('borrow success')
    } catch (error) {
        res.status(500).send(error)
    }

    // res.render('borrow', { borrowing });
});
router.get('/return', checkLogin,async function (req, res, next){

    const return_record = await BorrowingModel.findOneAndUpdate({no: req.query.no, username: req.session.username},{is_returned: true},{new: true});
    res.render('success_return',{msg:'return success'})
})
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
})

module.exports = router;