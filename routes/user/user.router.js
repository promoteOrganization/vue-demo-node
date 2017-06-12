/**
 * Created by lijiaxing on 2017/6/10.
 */
var express = require('express');
var router = express.Router();
var userModel = require('../../model/user'); // 引入user的model
var RestMsg = require('../../middlewares/RestMsg');
var Page = require('../../middlewares/page');
var modelGenerator = require('../../model/common/modelGenerator'); // 引入model公共方法对象
var User = modelGenerator(userModel, '_id');

router.route('/')
    .get(function (req, res, next) {
        var query = {};

        var restmsg = new RestMsg(); // 初始化restmsg，用于api返回信息
        User.find(query, function (err, objs) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
            }
            restmsg.successMsg(); // restmsg状态码设置为成功状态
            restmsg.setResult(objs); // restmsg结果部分设置为封装好的objs
            res.send(restmsg); // api返回restmsg
        })
    })
    .post(function (req, res, next) {
        var restmsg = new RestMsg();
        var email = req.body.email;
        var password = req.body.pass;
        var newUser = {
            'email' : email,
            'password' : password
        }

        User.save(newUser, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
            }
            restmsg.successMsg();
            restmsg.setResult(obj);
            res.send(restmsg);
        })
    })

router.route('/:id')
    .get(function (req, res, next) {
        var restmsg = new RestMsg();
        var userid = req.params.id;

        User.findById(userid, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
            }
            restmsg.successMsg();
            restmsg.setResult(obj);
            res.send(restmsg);
        })
    })
    .put(function (req, res, next) {
        var restmsg = new RestMsg();
        var userid = req.params.id;
        var updateEmail = req.body.email;

        var updateUser = {
            'email': updateEmail
        }

        User.update({_id: userid}, updateUser, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
            }
            restmsg.successMsg();
            restmsg.setResult(obj);
            res.send(restmsg);
        })
    })
    .delete(function (req, res, next) {
        var restmsg = new RestMsg();
        var userid = req.params.id;

        User.delete({_id: userid}, function (err, obj) {
            if (err) {
                restmsg.errorMsg(err);
                res.send(restmsg);
            }
            restmsg.successMsg();
            restmsg.setResult(obj);
            res.send(restmsg);
        })
    })

module.exports = router;

