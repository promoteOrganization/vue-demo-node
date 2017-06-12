/**
 * Created by lijiaxing on 2017/6/12.
 */
var express = require('express');
var router = express.Router();
var users = require('./user/user.router.js');

//允许跨域访问资源，
//router.use(function(req, res, next) {
//    res.header('Access-Control-Allow-Origin', '*');
//    next();
//});


router.use('/users', users);

module.exports = router;