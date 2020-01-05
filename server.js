var express = require('express');
var app = express();
var debug = require('debug')('DP:server');
var bodyParser = require('body-parser');
var routes = require('./src/Route/v1');
var passport = require('passport');
var session = require('express-session');

// CRON
//require('./src/Jobs/demoCronJob');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    key: 'MY_KEY',
    secret: 'MY_SECRET_KEY_T_MUST_BE_FROM_ENV',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});


app.use('/route/v1', routes);

/*app.get('/', function (req, res) {
    res.send('get api');
});
app.post('/', function (req, res) {
    res.send('post api');
});
app.put('/', function (req, res) {
    res.send('put api');
});
app.delete('/', function (req, res) {
    res.send('delete api');
});*/

/*
app.get('/jhkjh',function () {

})
*/

app.listen(3333, function () {
    debug('server js debug');
    console.log('Server start at port 3333');
});