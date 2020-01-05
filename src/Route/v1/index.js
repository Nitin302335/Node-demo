var express = require('express');
var UserRoute = require('./userRoute');
var routes = express.Router();

routes.use('/user', UserRoute);

module.exports = routes;