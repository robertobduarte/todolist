
'use strict';

//
// user
const userRetrieveController = require('../controllers/user/retrieve.controller');
const userPersistController  = require('../controllers/user/persist.controller');

const init = (expressInstance, basePath) => {
  expressInstance.post(`${basePath}/signup`, userPersistController.signup);
  expressInstance.post(`${basePath}/auth/signin`, userRetrieveController.signin);
};

module.exports = {
  init
};