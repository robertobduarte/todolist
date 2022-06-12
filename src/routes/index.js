'use strict';

//
// routes
const user = require('./_user.js');
const project = require('./_project.js');
const task = require('./_task.js');

//
// init routes
module.exports.init = (expressInstance, basePath) => {
  user.init(expressInstance, basePath);
  project.init(expressInstance, basePath);
  task.init(expressInstance, basePath);
};