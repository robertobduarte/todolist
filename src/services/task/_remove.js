
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
const remove = async (id) => {

  const project = await db.removeTask.remove(id);

  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-400_error-delete-task'), 400, 'ToDoList-400_error-delete-task');
  }
  if (project.affectedRows >= 1) {
    return true;
  }
  return false;
};

module.exports = {
  remove
};