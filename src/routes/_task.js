
'use strict';

//
// middlewares
const authorizerMiddleware = require('../middlewares/authorizer.middleware');

//
// project
const taskRetrieveController = require('../controllers/task/retrieve.controller');
const taskPersistController  = require('../controllers/task/persist.controller');

const init = (expressInstance, basePath) => {
  expressInstance.get(`${basePath}/task/:id`, authorizerMiddleware.verify, taskRetrieveController.getById);
  expressInstance.get(`${basePath}/task`, authorizerMiddleware.verify, taskRetrieveController.getAll);
  expressInstance.post(`${basePath}/task`, authorizerMiddleware.verify, taskPersistController.create);
  expressInstance.put(`${basePath}/task/:id`, authorizerMiddleware.verify, taskPersistController.edit);
  expressInstance.delete(`${basePath}/task/:id`, authorizerMiddleware.verify, taskPersistController.remove);

};

module.exports = {
  init
};