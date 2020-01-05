var debug = require('debug')('DP:UserService');
var Boom = require('boom');
var CronJob = require('cron').CronJob;
var StudentModel = require('../Model/student');


new CronJob('*/5 * * * * *', function () {
    debug('You will see this message every second', new Date());
}, null, true, 'Asia/Kolkata');
debug('ths souhodjlfsj kjlksdjflksjd')
// new CronJob('*/5 * * * * *', run(), null, true, 'Asia/Kolkata');

// function run() {
//     debug('You will see this message every second', new Date());
//     return;
// }

