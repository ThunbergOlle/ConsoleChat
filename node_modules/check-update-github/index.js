#!/usr/bin/env node
'use strict';
var latest = require('./lib/latest-version.js'), colors = require('colors');
var defaultMessage = function (options) {
  if (options.latestVersion == options.currentVersion) {
    return 'You have the latest version of ' + colors.green(options.name) + colors.dim(' (current: ' + options.currentVersion + ')');
  } else {
    return 'Update available: ' + colors.green(options.latestVersion) + colors.dim(' (current: ' + options.currentVersion + ')');
  }
};
module.exports = function (options, cb) {
  latest(options, function (err, latestVersion) {
    options.latestVersion = latestVersion;
    if (err) {
        cb(err);
        return;
    } else if (options.currentVersion == undefined){
        cb(null, latestVersion, null);
        return;
    } else {
        cb(null, latestVersion, defaultMessage(options));
        return;
    }
  });
};