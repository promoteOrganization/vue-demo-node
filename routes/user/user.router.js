/**
 * Created by lijiaxing on 2017/6/10.
 */
var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.route('/')
    .get(function (req, res, next) {
        var query = {};

        var user = new User();

        user.findList(query, {}, function (err, objs) {
                if (err) {
                res.send(console.error(err));
            }
            res.send(console.log(objs));
        })
        res.send('respond with a resource');
    })
    .post(function (req, res, next) {
        var email = req.body.email;
        var password = req.body.pass;
        var newUser = new User({
            'email' : email,
            'password' : password
        })
        newUser.save(function (err, obj) {
            if (err) {
                res.send(console.error(err));
            }
           res.send(console.log(obj));
        })
    })

router.route('/:id')
    .get(function (req, res, next) {
        var userid = req.param('id');

        var user = new User();

        user.findById({_id: userid}, function (err, obj) {
            if (err) {
                res.send(console.error(err));
            }
            res.send(console.log(obj));
        })
    })
    .put(function (req, res, next) {
        var userid = req.param('id');
        var updateEmail = req.body.email;

        var updateUser = new User({
            'email': email
        })

        updateUser.update({_id: userid}, function (err, obj) {
            if (err) {
                res.send(console.error(err));
            }
            res.send(console.log(obj));
        })
    })
    .delete(function (req, res, next) {
        var userid = req.param('id');

        var user = new User();

        user.delete({_id: userid}, function (err, obj) {
            if (err) {
                res.send(console.error(err));
            }
            res.send(console.log(obj));
        })
    })

module.exports = router;

    