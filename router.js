/**
 *  路由模块
 */
const express = require('express');
const router = express.Router();
const service = require('./service.js');

router.get('/',service.showIndex)
// 跳转到添加图书界面
router.get('/to_add_book',service.toAddBook)
module.exports = router;