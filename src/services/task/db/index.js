'use strict';

const createTask = require('./_create.js');
const retrieveTask = require('./_retrieve.js');
const removeTask = require('./_remove.js');
const updateTask = require('./_update.js');

//
// exports
module.exports = {
  createTask,
  retrieveTask,
  updateTask,
  removeTask
};