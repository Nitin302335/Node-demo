var Boom = require('boom');
var debug = require('debug')('DP:UserController');

var UserController = {
    appNewUser: function (req, res, next) {
        if (!req.userStore) {
            return next(Boom.notFound('TRY AGAIN...!!!'));
        }
        debug('userstore', req.userStore);
        res.send(req.userStore);
    }
};

module.exports = UserController;