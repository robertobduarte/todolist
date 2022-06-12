
'use strict';

//
// middlewares
const authorizerMiddleware = require('../middlewares/authorizer.middleware');

//
// project
const projectRetrieveController = require('../controllers/project/retrieve.controller');
const projectPersistController  = require('../controllers/project/persist.controller');

const init = (expressInstance, basePath) => {
  expressInstance.get(`${basePath}/project/:id`, authorizerMiddleware.verify, projectRetrieveController.getById);
  expressInstance.get(`${basePath}/project`, authorizerMiddleware.verify, projectRetrieveController.getAll);
  expressInstance.post(`${basePath}/project`, authorizerMiddleware.verify, projectPersistController.create);
  expressInstance.put(`${basePath}/project/:id`, authorizerMiddleware.verify, projectPersistController.edit);
  expressInstance.delete(`${basePath}/project/:id`, authorizerMiddleware.verify, projectPersistController.remove);

};

module.exports = {
  init
};