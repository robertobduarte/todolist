
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
const create = async (data) => {
   
  try {
    return await db.createTask.create(data);

  } catch (err) {
    logger.info('erro ao persistir project: :::', err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-persist-project'), 400, 'ToDoList-400_error-to-persist-project');
  }
};

module.exports = {
  create
};