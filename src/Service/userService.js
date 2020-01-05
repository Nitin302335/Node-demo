var debug = require('debug')('DP:UserService');
var Boom = require('boom');
var nodemailer = require('nodemailer');
var StudentModel = require('../Model/student');

var UserService = {

    authorizeUser: function (req, res, next) {
        debug('Inside createStudent');
        if (req.session && !req.session.user) {
            err = new Error('SESSION_INVALID');
            err.status = 401; // 401 - unathorize
            return next(err);
        }
        return next()
    },

    reGenerateSession: function (req, res, next) {
        debug('Inside createStudent');
        req.session.user = req.user;
        debug('req.session.user', req.session.user)
        return next()
        // req.session.reGenerate(function (err) {
        //     if (err) {
        //         err = new Error('SESSION_RE_GENERATE_FAILED');
        //         err.status = 401; // 401 - unathorize
        //         return next(err);
        //     }
        //     req.session.user = req.user;
        //     return next()
        // })
    },

    createStudent: function (req, res, next) {
        debug('Inside createStudent');
        var body = new StudentModel(req.body);
        body.save(function (err, res) {
            if (err) {
                return next(Boom.notFound('STUDENT_INSERT_FAILED'));
            }
            req.userStore = res;
            //res.send('success...!!!');
            return next();
        });
    },

    validateRequest: function (req, res, next) {
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var err;

        if (!email) {
            err = new Error('EMAIL_REQUIRED');
        } else if (!password) {
            err = new Error('PASSWORD_REQUIRED');
        }
        if (err) {
            err.status = 400;
            return next(err);
        }
        return next()
    },

    error: function (err, req, res, next) {
        debug('nsde handleerror', err);
        var error = {};
        var status = err.status || 500;

        error.message = err.message;
        error.status = status;

        res.status(status).send(error)
    },

    login: function (req, res, next) {
        debug('Inside login');
        var body = req.body;
        var email = body.email;
        var password = body.password;
        var err;

        StudentModel.findOne({ email: email }).exec(function (err, student) {
            if (err || !student) {
                //err = new Error('STUDENT_NOT_FOUND');
                //err.status = 400;
                debug('err', err);
                err = new Error('INVALID_EMAIL');
                err.status = 400;
                //res.send(err);
                return next(err);
            }
            debug('student.password', student)
            //student = student[0];
            if (student.password !== password) {
                err = new Error('INVALID_PASSWORD');
                err.status = 400;
                //res.send(err);
                return next(err);
                //return next(Boom.notFound('INVALID_PASSWORD'));
            }
            req.user = student;
            req.userStore = {
                OK: 'SUCCESS',
                firstName: student.firstName,
                lastName: student.lastName
            };
            return next();
        });
    },

    getStudent: function (req, res, next) {
        debug('Inside getStudent');
        var params = req.query;
        var firstName = params.firstName;

        StudentModel.find({ firstName: firstName }).exec(function (err, student) {
            if (err || student.length <= 0) {
                //err = new Error('STUDENT_NOT_FOUND');
                //err.status = 400;
                debug('err', err)
                //res.send(err);
                return next(Boom.notFound('STUDENT_NOT_FOUND'));
            }
            req.userStore = student;
            return next();
        });
    },

    getAllStudent: function (req, res, next) {
        debug('Inside getAllStudent');
        var params = req.query;
        var firstName = params.firstName;

        StudentModel.find({}).exec(function (err, student) {
            if (err || student.length <= 0) {
                debug('err', err);
                return next(Boom.notFound('STUDENT_NOT_FOUND'));
            }
            req.userStore = student;
            return next();
        });
    },

    updateStudent: function (req, res, next) {
        debug('Inside updateStudent');
        var body = req.body;
        var query = req.query;
        var id = query.id;

        StudentModel.update({ _id: id }, body, function (err, student) {
            debug('student12345', student);
            if (err || !student) {
                err = new Error('STUDENT_UPDATION_FAILED');
                return next(err);
            }
            req.userStore = student;
            return next();
        });
    },

    deleteStudent: function (req, res, next) {
        debug('Inside deleteStudent');
        var body = req.body
        req.userStore = { OK: 'delete Success...!!!' };
        //res.send('success...!!!');
        return next();
    },

    sendmail: function (req, res, next) {
        debug('Inside sendmail');
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        //var body = req.body;
        //var to = body.to;
        //var text = body.text;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nitinjetapara302@gmail.com',
                pass: '8460361074'
            }
        });
        debug('2')

        var mailOption = {
            from: 'nitinjetapara302@gmail.com',
            to: 'nitinjetapara302@gmail.com',
            subject: 'Mail send by node js demo project',
            text: 'Mail Sent by Nitin J.....!!!'
        }

        debug('3')
        transporter.sendMail(mailOption, function (err, res) {
            if (err) {
                debug('err', err);
                return next(err);
            } else {
                debug('4')
                debug('info.response', res.response)
                req.userStore = { OK: 'Mail sent Success...!!!' };
                return next()
            }

        });
    }
};

module.exports = UserService;