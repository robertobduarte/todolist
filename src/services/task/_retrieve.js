
'use strict';
//
// services
const db = require('./db');
const i18n = require('../../i18n');
const serviceProject = require('../../services/project');

//
// common api
const { logger, error } = require('common-api');


//
// exports
const getAllOfTheProject = async (data) => {
   
  try {
    return await db.retrieveTask.getAllOfTheProject(data);

  } catch (err) {
    logger.info('erro ao buscar tasks: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-tasks'), 400, 'ToDoList-400_error-to-find-tasks');
  }
};

const getById = async (data) => {
   
  try {
    const task = await db.retrieveTask.getById(data.id);
    const project = await serviceProject.retrieveProject.getById({ 'id': task.project, 'user': data.user});
    if (!project) {
      throw new error.HttpError('ToDoList-401_unauthorized', 401, 'ToDoList-401_unauthorized');
    }
    return task;

  } catch (err) {
    logger.info('erro ao buscar task: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-task'), 400, 'ToDoList-400_error-to-find-task');
  }
};

module.exports = {
  getAllOfTheProject,
  getById
};