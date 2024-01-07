/**
 *  业务模块
 */
const data = require("./books.json")
const {response} = require("express");
const path = require('path')
const fs = require('fs');
const db = require('./db/db')
const mongoose = require("mongoose");
// const BookModel = require('./models/BookModel')
// var books ;

// db(()=>{
//     console.log('连接成功...')
//     // BookModel.create({
//     //     no:1,
//     //     title:'Three People' ,
//     //     type: 'novel',
//     //     author: "Guanzhong Luo",
//     //     publisher: 'Chinese liberater',
//     //     status: 'in lib'
//     // }).then(r=>{
//     //     console.log("add book ok")
//     // })
//     BookModel.
// },()=>{
//     console.log('连接失败...')
// })

// 自动生成图书编号（自增）
let maxBookNo = ()=>{
    let arr = [];
    data.forEach((item)=>{
        arr.push(item.no);
    })
    return Math.max.apply(null,arr);
}
// 渲染主页面
exports.showIndex = (req,res,next)=>{
    BookModel.find(undefined, undefined, undefined).sort({id: -1}).exec().then(r =>{
        console.log("find success")
    })
    res.render('index2',{list: data})
}
exports.toAddBook = (req,res)=>{

    res.render('add_book',{})
}

exports.addBook = (req,res)=>{
    // res.render('add_book',{})
    let info  = req.body
    let book = {}
    for (let key in info){
        book[key] = info[key];
    }
    book.no= maxBookNo()+1;
    data.push(book)
    fs.writeFile(path.join(__dirname,"data.json"),JSON.stringify(data),(err)=>{
        if(err){
            res.send('server error')
        }
    })
}