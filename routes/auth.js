/**
 * Created by lijiaxing on 2017/6/12.
 */
var express = require('express');
var router = express.Router();
var encrypt = require('../middlewares/encrypt');
var crypto = require('crypto');
var userModel = require('../model/user');
var modelGenerator = require('../model/common/modelGenerator');
var User = modelGenerator(userModel, '_id');
var RestMsg = require('../middlewares/restmsg');

// 登录相关
router.route('/login')
	.get(function(req, res, next) {
		var restmsg = new RestMsg();

		// 邮箱验证码
		var randomCaptcha = randomWord.getRandomWord(4);
		restmsg.successMsg();
		restmsg.setResult(randomCaptcha);
		res.send(restmsg);
	})
	.post(function(req, res, next) {
		var restmsg = new RestMsg();
		var email = req.body.email;
		var password = req.body.password;
		var query = {
			'email': email
		}

		User.findOne(query, function(err, obj) {
			if (err) {
				restmsg.errorMsg(err);
				res.send(restmsg);
				return;
			}

			var hashPass = obj.password; // 数据库密码
			var hashSalt = hashPass.split('.')[1]; // 对应用户盐值
			var hash = encrypt.sha1HashCompare(password, hashSalt); // 用于比较的hash值
			if (hashPass === hash) {
				req.session.uid = obj._id;
				restmsg.successMsg();
				restmsg.setResult(req.session)
        		res.send(restmsg);
			} else {
				restmsg.errorMsg('您的账户名或密码错误!');
				res.send(restmsg);
				return;
			}
		})
	})

// 退出登录
router.route('/loginOut')
	.get(function(req, res, next) {
		if (req.session) {
	        req.session.uid = null;
	        res.clearCookie('uid');
	        req.session.destroy();
	    }
	    res.redirect('/login');
	})

module.exports = router;