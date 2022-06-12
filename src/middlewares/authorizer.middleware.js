'use strict';

//
// dependencies
const { error } = require('common-api');
const verifyToken = require('../services/user/_verifyToken'); 

//
// exports
const verify = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (authorization) {

    const userid = await verifyToken.verify(authorization);
    if (userid) {
      req.userId = userid;
      return next();
    }
  }
  throw new error.HttpError('Missing autentication token.', 403, 'ToDoList-403_missing-authentication-token');
};

module.exports = {
  verify
};