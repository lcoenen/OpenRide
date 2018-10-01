"use strict";
exports.__esModule = true;
var env = process.env.NODE_ENV || 'development';
exports.settings = {
    name: 'openride-server',
    version: '2.0.0',
    port: 3000,
    env: 'dev',
    mongoUrl: 'mongodb://localhost:27017',
    dbName: 'openride',
    sessionTTL: 10000
};
if (env === 'production') {
    exports.settings.env = 'prod';
    // other production settings
}
