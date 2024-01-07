var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var template = require('art-template');
var mongoose =require('mongoose');
var bodyParser = require('body-parser')
const session = require('express-session');
const fs = require('fs');
const secretKey = fs.readFileSync('secret.key');
const MongoStore = require('connect-mongo');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');
var bookingRouter = require('./routes/booking')
var adminRouter = require('./routes/admin')
var borrowingRouter = require('./routes/borrowing')
var router = require('./router')

const {render} = require("art-template");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');
app.engine('art',require('express-art-template'));
const data = require("./books.json")
const service = require("./service");
app.get('/index2',(req,res)=>{
  res.render('index2',{
    list:data
  })
})
// app.get('/to_add_book',service.toAddBook)
var {MongoClient} = require('mongodb');
const sessionMiddleware = require("./midware/session");
var url = 'mongodb://127.0.0.1:27017/test';
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("数据库已创建!");
  db.close();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionMiddleware)

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);
app.use('/booking', bookingRouter);
app.use('/admin', adminRouter);
app.use('/borrowing',borrowingRouter)
app.use('/1',router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.error(err)
  res.render('error');
});

module.exports = app;
