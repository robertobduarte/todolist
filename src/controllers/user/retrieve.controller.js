
'use strict';

//
// common api
const { logger, validator, response, error } = require('common-api');
const i18n = require('../../i18n');

//
// services
const serviceUser = require('../../services/user');

//
// private
const _validateCreateBody = (body) =>{
  const createSchema = {
    'id'         : '/CreateUser',
    'type'       : 'object',
    'properties' : {
      'email'    : {'type': 'string'},
      'password' : {'type': 'string'}
    },
    'required': ['email', 'password']
  };
  return validator.validate(createSchema, body);
};

//
// exports
const signin = async (req, res) => {
  const data = _validateCreateBody(req.body);
 
  const user = await serviceUser.signinUser.signin(data);
  
  if (!user) {
    logger.info('password invalid', user);
    throw new error.HttpError(i18n.__('ToDoList-403_user-not-found'), 403, 'ToDoList-403_user-not-found');
  }

  return response.success(res, user);
};

module.exports = {
  signin
};