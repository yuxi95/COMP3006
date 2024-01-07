let checkLoginMiddleware = (req, res, next) => {
    if(!req.session.username){
        res.redirect('/users/login-page'); // 如果没有登录，重定向到登录页面
    }

    next(); // 如果已经登录，继续执行后面的中间件或路由处理程序
}

module.exports = checkLoginMiddleware;