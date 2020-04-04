// razzle.config.js
'use strict';
var fs = require('fs');

module.exports = {
  modify(config, { target, dev }, webpack) {
    const appConfig = config; // stay immutable here

   if (target === 'web' && dev) {
        appConfig.devServer.https = true;
        appConfig.devServer.key = fs.readFileSync(process.env.ServerPrivateKey);
        appConfig.devServer.cert = fs.readFileSync(process.env.ServerCertificate);
    }
    if (dev) {
        appConfig.output.publicPath = 'https://localhost:3001/'
    }
    return appConfig;
  },
};