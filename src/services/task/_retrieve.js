
'use strict';
//
// services
const db = require('./db');
const i18n = require('../../i18n');

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
    return await db.retrieveTask.getById(data.id);

  } catch (err) {
    logger.info('erro ao buscar task: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-task'), 400, 'ToDoList-400_error-to-find-task');
  }
};

module.exports = {
  getAllOfTheProject,
  getById
};