/**
 * Created by lijiaxing on 2017/6/10.
 */
var express = require('express');
var router = express.Router();
var User = require('../model/user');

router.route('/')
    .get(function (req, res, next) {
        res.send('respond with a resource');
    })
    .post(function (req, res, next) {
        var email = req.body.email;
        var password = req.body.pass;
        var newUser = {
            'email' : email,
            'password' : password
        }
        User.save(newUser, function (err, obj) {
            if (err) {
                console.error(err);
            }
            console.log(obj);
        })
    })