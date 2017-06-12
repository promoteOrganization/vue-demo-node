/**
 * Created by lijiaxing on 2017/6/12.
 */
 var express = require('express');
 var router = express.Router();

 // 访问首页
router.route('/')
	.get(function(req, res) {
		if (req.session.uid) {
			res.render('index',{"name": "admin"});
		} else {
			res.redirect('/login');
		}
	})

// 登录相关
router.route('/login')
	.get(function(req, res) {
		if (req.session.uid) {
            res.redirect('/');
        } else {
            res.render('login');
        }
	})
	.post(function(req, res) {
		if (req.body.accountName == "admin" && req.body.password == 'admin') {
            req.session.uid = 1;
            res.redirect('/');
        } else {
            res.render('login');
        }
	})

// 退出登录
router.route('/loginOut')
	.get(function(req, res) {
		if (req.session) {
	        req.session.uid = null;
	        res.clearCookie('uid');
	        req.session.destroy();
	    }
	    res.redirect('/login');
	})

module.exports = router;