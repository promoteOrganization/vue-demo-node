/**
 * Created by Lijiaxing on 2017/6/10.
 */

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/vueDemo");

module.exports = mongoose;