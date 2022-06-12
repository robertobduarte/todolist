'use strict';

const createProject = require('./_create.js');
const retrieve = require('./_retrieve.js');
const removeProject = require('./_remove.js');
const update = require('./_update.js');

//
// exports
module.exports = {
  createProject,
  retrieve,
  update,
  removeProject
};