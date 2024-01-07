const session = require('express-session');
const MongoStore = require("connect-mongo");
const secret = 'your-secret-key';
var url = 'mongodb://127.0.0.1:27017/test';
const fs = require('fs');
const secretKey = fs.readFileSync('secret.key');
// console.log(secretKey)
const sessionMiddleware = session({
    name:'session-id',
    secret: secretKey.toString(),
    resave: true,
    saveUninitialized: false,
    store:MongoStore.create({
        mongoUrl:url
    }),
    cookie:{
        httpOnly:true,
        maxAge:1000*60*5
    }
});

module.exports = sessionMiddleware;