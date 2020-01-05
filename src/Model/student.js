var mongoose = require('mongoose');
var db = require('../db');
var schema = mongoose.Schema;
var student = schema({
    firstName: String,
    lastName: String,
    email:String,
    password:String,
    age: String,
    mobile:Number,
    address: Object
});

var Student = mongoose.model('Student', student);
module.exports = Student;