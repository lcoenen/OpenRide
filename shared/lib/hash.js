"use strict";
exports.__esModule = true;
var crypto = require("crypto");
function checksum(str, algorithm, encoding) {
    return crypto
        .createHash(algorithm || 'md5')
        .update(str, 'utf8')
        .digest(encoding || 'hex');
}
function hash() {
    var str = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        str[_i] = arguments[_i];
    }
    return checksum(str.reduce(function (a, b) { return a + b; }, ''));
}
exports.hash = hash;
console.log("Trying to get " + hash("salut", "ehllo", 22));
