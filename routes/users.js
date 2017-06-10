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
        var newUser = new User({
            'email' : email,
            'password' : password
        })
        newUser.save(function (err, obj) {
            if (err) {
                console.error(err);
            }
           res.send(console.log(obj));
        })
    })

module.exports = router;
