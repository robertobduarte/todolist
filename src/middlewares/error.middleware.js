'use strict';

const { error } = require('common-api');

const errorMiddleware = async (err, req, res, next) => {
  if (err instanceof error.HttpError) {
    return res.status(400).json({
      error: {
        code    : err.businessStatusCode,
        message : req.__(err.message)
      },
      requestId: res.requestId
    });
  }

  return res.status(500).json({
    error: {
      code    : 'ToDoList-500_internal-server-error',
      message : err.message
    },
    requestId: res.requestId
  });
};

module.exports = errorMiddleware;