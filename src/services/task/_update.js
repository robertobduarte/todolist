
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

  const task = await db.updateTask.update(data);

  if (!task) {
    throw new error.HttpError(i18n.__('ToDoList-400_error-update-task'), 400, 'ToDoList-400_error-update-task');
  }
  if (task.affectedRows >= 1) {
    return true;
  }
  return false;
};

module.exports = {
  update
};