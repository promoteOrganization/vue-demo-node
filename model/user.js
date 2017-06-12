/**
 * Created by lijiaxing on 2017/6/10.
 */

var mongoose = require("../db/db");

var userSchema = mongoose.Schema({
	'uid': String, // 用户id
    'accountName': String, // 用户账户名称
    'password': String, // 用户账户密码
    'email': String // 用户邮箱
})

var user = mongoose.model('users', userSchema, 'users');

module.exports = user;