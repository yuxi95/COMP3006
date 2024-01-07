var express = require('express');
const service = require("../service");
var router = express.Router();
const moment = require('moment')
const BookModel = require("../models/BookModel");
const e = require("express");

const searchIndex = [];

const fillSearchIndex = async () => {
    const books = await BookModel.find({});
    books.forEach(book => {
        searchIndex.push({
            no:book.no,
            type: book.type,
            title: book.title,
            author: book.author,
            publisher: book.publisher,
            status: book.status
        });
    });
    // console.log("============================================")
    // console.log(searchIndex)
    // console.log(books)
};
fillSearchIndex();
let checkBook = async (req,res,next)=>{
    let borrowed_book = await BookModel.findOne({no: req.query.no, title: req.query.title},{status: 1},{});
    if(borrowed_book.status !== 'in lib'){
        res.send('Book is not available');
    }
}
router.get('/search',function (req,res,next){
    console.log(searchIndex)
    const searchQuery = req.query.search_query;
    console.log(searchQuery)
    const results = searchIndex.filter(book => book.title.includes(searchQuery) || book.author.includes(searchQuery) ||book.publisher.includes(searchQuery));
    console.log(results)
    res.render('index2',{list:results})
});
/* GET books listing. */
router.get('/list', async function (req, res, next) {
    // res.send('books list');
    let book_type = req.query.type;
    console.log(book_type)
    let books;
    if (book_type === undefined) {
        books = await BookModel.find({});
    } else {
        books = await BookModel.find({ type: book_type });
    }
    res.render('index2', { list: books });
    // if (book_type === undefined) {
    //     // book_type = '';
    //     BookModel.find({}, undefined, undefined).then(books => {
    //         res.render('index2', {list: books})
    //         // console.log(books)
    //     })
    //     return;
    // }
    // BookModel.find({type: book_type}, undefined, undefined).then(books => {
    //     // console.log(books)
    //     // data = books;
    //     res.render('index2', {list: books})
    // })
    // console.log(data)
    // res.render('index2', {list:data})
});

router.get('/info', function (req, res, next) {
    res.send('book  info[book_name,writer,publisher,type,status]');
});
router.get('/get_books_by_type', function (req, res, next) {
    res.send('find book by type');
});
// router.get('/search', function (req, res, next) {
//     res.send('book info');
// });
router.get('/delete', async function (req, res, next) {
    try{
        const book = await BookModel.findOneAndDelete({no:req.query.no})
        if (!book) {
            return res.status(404).send('Book not found');
        }

        res.status(200).send('Book deleted successfully');
    }catch (error){
        res.status(500).send('Error deleting book');
    }
});
// router.get('/to_add_book')
router.get('/to_add_book', service.toAddBook)
// router.post('/add_book',service.addBook)
router.post('/add_book', async function (req, res) {
    // console.log(req.body)
    // var maxBookNo;
    // BookModel.find(undefined, undefined, undefined).sort({no:-1}).limit(1)
    //     .then(res=>{
    //         console.log(res)
    //         if(res.length > 0){
    //             maxBookNo = res[0].no;
    //         }
    //     })
    // let book =  BookModel.find(undefined,undefined,undefined).sort({no:-1}).limit(1);
    // console.log(book)
    const books = await BookModel.find({},{no:1}, {sort:{no:-1},limit:1});
    console.log(books)
    let new_book_no = 0;
    if(books[0]){
        new_book_no = books[0].no
    }
    // try {
        const book = BookModel.create({
            no:new_book_no+1,
            title: req.body.title,
            type: req.body.type,
            author: req.body.author,
            publisher: req.body.publisher
            // ...req.body

        }).then(r=>{
            res.render('success', {msg: 'add ok'})

        }).catch(err=>{
            console.error(err)
            res.render('error', {msg: 'add book error: title is null',button: '<a href="/books/to_add_book">add book</a>'})
        })
})
// router.delete()
module.exports = router;
// module.exports = checkBook