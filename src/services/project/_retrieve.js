
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
const getAllByUser = async (data) => {
   
  try {
    return await db.retrieve.getAllByUser(data);

  } catch (err) {
    logger.info('erro ao buscar project: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-projects'), 400, 'ToDoList-400_error-to-find-projects');
  }
};

const getById = async (data) => {
   
  try {
    return await db.retrieve.getById(data);

  } catch (err) {
    logger.info('erro ao buscar project: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-project'), 400, 'ToDoList-400_error-to-find-project');
  }
};

module.exports = {
  getAllByUser,
  getById
};