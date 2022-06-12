
'use strict';
//
// services
const db = require('./db');
const i18n = require('../../i18n');
//
// common api
const { error } = require('common-api');

//
// exports
const update = async (data) => {

  const project = await db.update.update(data);

  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-400_error-update-project'), 400, 'ToDoList-400_error-update-project');
  }
  if (project.affectedRows >= 1) {
    return true;
  }
  return false;
};

module.exports = {
  update
};