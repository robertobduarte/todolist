
'use strict';
//
// services
const db = require('./db');
const i18n = require('../../i18n');
const md5 = require('md5');
const createToken = require('./_createToken');
//
// common api
const { logger, error } = require('common-api');

const verifyHash = ( userPass, hashDB ) => {
  const hash = md5(`${userPass}${process.env.SALT_PASSWORD}`);
  if (hash === hashDB) {    
    return true;
  }
  return false;
};

//
// exports
const signin = async (data) => {

  try {
    const user = await db.retrieve.getByEmail(data.email);
    if (!user) {
      logger.info('user not found');
      throw new error.HttpError('ToDoList-403_user-not-founds', 403, 'ToDoList-403_user-not-founds');
    }  
    
    if (!verifyHash(data.password, user.password)) {
      return false;
    }

    const token = await createToken.create({'id': user.id});
    return { 'auth': true, token};
    
  } catch (error) {
    logger.info(`error find user: ${data.email}:::`, error);
    throw new error.HttpError(i18n.__('ToDoList-400_error-to-find-user'), 400, 'ToDoList-400_error-to-find-user');
  }

};

module.exports = {
  signin
};