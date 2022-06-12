
'use strict';

//
// dependencies
const { validator, response, error } = require('common-api');
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
      'name'     : {'type': 'string'},
      'email'    : {'type': 'string'},
      'password' : {'type': 'string'}
    },
    'required': ['name', 'email', 'password']
  };
  return validator.validate(createSchema, body);
};

//
// exports
const signup = async (req, res) => {
  const user = _validateCreateBody(req.body);

  try {

    const userCreated = await serviceUser.createUser.create(user);
    user.id = userCreated.id;

    return response.success(res, user, 201);
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('ToDoList-400_error-register-user'), 400, 'ToDoList-400_error-register-user');
  }
};

module.exports = {
  signup
};