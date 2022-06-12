
'use strict';
//
// services
const db = require('./db');
const serviceTask = require('../task');

const i18n = require('../../i18n');
//
// common api
const { error } = require('common-api');

//
// exports
const remove = async (data) => {

  const tasks = await serviceTask.retrieveTask.getAllOfTheProject(data.id);
  if (tasks) {

    for (const task of tasks) {
      serviceTask.removeTask.remove(task.id);
    }
  }
  
  const project = await db.removeProject.remove(data);

  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-400_error-delete-project'), 400, 'ToDoList-400_error-delete-project');
  }
  if (project.affectedRows >= 1) {
    return true;
  }
  
  return false;
};

module.exports = {
  remove
};