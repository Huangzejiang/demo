const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check.js').checkLogin
const checkNotLogin = require('../middlewares/check.js').checkNotLogin
const UserModel = require('../models/users')

router.post('/', checkNotLogin, function(req, res){
    var user = {
        name: req.fields.id,
        password: req.fields.pwd
    }
    UserModel.create(user).then(function(result) {
        console.log(result);
        req.session.user = user;
        res.json({status: true, message: "注册成功"});
    }).catch(function(e){
        console.log(e);
        if (e.errmsg.match('duplicate key')) {
            res.json({status: false, message: 'error'+'用户名已被占用'})
        }
    })
})

module.exports = router