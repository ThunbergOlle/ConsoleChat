#!/usr/bin/env node
'use strict';
var got = require('got'), url = 'https://raw.githubusercontent.com/';
module.exports = function (options, cb) {
  if (typeof options.branch == 'undefined') options.branch = 'master';
  if (options.name == undefined) {
      cb(new Error('Please set a name.'));
      return;
  }
  got(url + encodeURIComponent(options.user) + '/' + encodeURIComponent(options.name) + '/' + encodeURIComponent(options.branch) + '/package.json', function (err, data) {
    if (err === 404) {
      cb(new Error('Package or version doesn\'t exist on github.'));
      return;
    }
    if (err) {
      cb(err);
      return;
    }
    cb(null, JSON.parse(data).version);
  });
};
