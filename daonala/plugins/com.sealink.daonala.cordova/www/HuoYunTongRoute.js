var exec = require('cordova/exec');

exports.route = function(success, error) {
    exec(success, error, "HuoYunTongRoute", "route", []);
};