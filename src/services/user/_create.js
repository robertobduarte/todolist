
'use strict';
//
// services
const db = require('./db');
const i18n = require('../../i18n');
const md5 = require('md5');

//
// common api
const { logger, error } = require('common-api');

const generatorHash = ( data ) => {
  const hash = md5(`${data}${process.env.SALT_PASSWORD}`);
  return hash;
};

//
// exports
const create = async (data) => {

  const userExist = await db.retrieve.getByEmail(data.email);
  if (userExist) {
    throw new error.HttpError('ToDoList-409_user-already-exists', 409, 'ToDoList-409_user-already-exists');
  }
  
  const userData = {
    'name'     : data.name,
    'email'    : data.email,
    'password' : generatorHash(data.password)
  };
  
  try {
    return await db.create.create(userData);

  } catch (err) {
    logger.info(`erro ao persistir user: ${userData}:::`, err);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-persist-user'), 400, 'ToDoList-400_error-to-persist-user');
  }
};

module.exports = {
  create
};