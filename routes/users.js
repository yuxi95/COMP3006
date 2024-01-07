var express = require('express');
const UserModel = require("../models/UserModel");
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
router.get('/test', function (req, res, next) {
    res.send('user test');
});
router.get('/logout',function (req, res, next){
    // res.session.user = undefined;
    req.session.destroy(); // 清空session对象
    // res.render('login')
    res.redirect('/users/login-page')
})
router.get('/borrow-records', function (req, res, next) {
    // let records =
    res.render('user_borrowed_books',{list:records})
})
router.get('/list', async function (req, res, next) {
    // res.send('user list');
    let allUsers = await UserModel.find({role:'user'});
    // console.log(allUsers)
    res.render('manage_user', {list: allUsers})
});
router.post('/login', function (req, res) {
    let role = req.body.role
    console.log("role :"+role)
    let login_password = req.body.password
    if ('admin' === role) {
        UserModel.findOne({username: req.body.username}, {}, {})
            .then(loginUser => {
                if(loginUser.role !== role){
                    console.log("role error")
                    res.render('error', {msg: 'role error: your role is not admin'});
                    return;
                }
                if (loginUser.password !== login_password) {
                    console.log("password error")
                    res.render('error', {msg: 'password error'})

                } else {
                    // req.session.user=loginUser;
                    req.session.username = req.body.username
                    req.session.role = req.body.role
                    req.session.name = loginUser.name
                    req.session.mobile_phone = loginUser.mobile_phone
                    console.log('3......')
                    // res.render('admin', {username:req.body.username})
                    res.render('admin',{session:req.session})
                    // try {
                    //     res.render('admin')
                    // }catch (error){
                    //     console.log('res.render error')
                    // }
                    console.log("4......")
                }
            })
    }
    if ('user' === role) {
        UserModel.findOne({username: req.body.username}, undefined, undefined)
            .then(loginUser => {
                if (loginUser.password === login_password) {
                    // req.session.user=loginUser;
                    req.session.username = req.body.username
                    req.session.role = req.body.role
                    req.session.name = loginUser.name
                    req.session.mobile_phone = loginUser.mobile_phone

                    res.redirect('/books/list')
                } else {
                    // res.render('manage_book', {})
                    console.log("user role login .....")
                    res.render('error', {msg: 'password error',button:'<a href="/users/login-page">return to login</a>'})

                }
            })
    }

    // form.reset();
})
router.get('/login-page', function (req, res) {
    res.render('login')
})
router.get('/login-info',function (req, res){
    res.render('login_info')
})
router.get('/register-page', function (req, res, next) {
    res.render('register')
});
router.post('/register', function (req, res, next) {
    // req.body
    console.log(req.body)
    let password = req.body.password;
    let repeat_password = req.body.repeat_password;
    if (password !== repeat_password) {
        res.render('error', {msg: 'register error: The password entered twice is inconsistent'})
        return;
    }
    UserModel.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        student_id: req.body.student_id,
        mobile_phone: req.body.mobile_phone,
        academy: req.body.academy,
        status: 'active'
    }).then(r => {
        res.render('success_register', {msg: 'user register success'});
    }).catch(r => {
        res.render('error', {msg: 'register error'})
    })
});
router.get('/info', async function (req, res, next) {
    let current_user = await UserModel.findOne({username: req.query.username});
    res.render('user_info', {user: current_user});
    // res.send('user info');
});
router.get('/permission', function (req, res, next) {
    res.send('user permission');
});
router.get('/edit',async function (req, res, next) {
    let current_user = await UserModel.findOne({username: req.query.username});
    res.render('edit_user',{user:current_user})
})
router.post('/edit-save',async function(req, res, next){
    console.log(req.body.password)
    await UserModel.updateOne({username: req.query.username},{
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
        student_id: req.body.student_id,
        mobile_phone: req.body.mobile_phone,
        academy: req.body.academy,
        status: 'active'}).then(r=>{
            res.redirect('/users/list')
    })
})
router.get('/reset-password',async function(req, res, next)  {
    await UserModel.updateOne({username: req.query.username},{password:'123456'});
    console.log('Reset password successful for user: ' + req.query.username+'  new password is: 123456');
    // res.render('success',{msg:current_user,button:''});
    // prompt('Reset password successful for user: ' + req.query.username + '  new password is: 123456')
    res.send('Reset password successful for user: ' + req.query.username+'  new password is: 123456')
})


module.exports = router;
