
'use strict';

//
// common api
const { response, error } = require('common-api');
const i18n = require('../../i18n');
//
// services
const serviceProject = require('../../services/project');
//
// exports
const getById = async (req, res) => {
  const { id } = req.params;
  const user = req.userId;

  const project = await serviceProject.retrieveProject.getById({ 'id': id, 'user': user});
  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-404_project-not-found'), 404, 'ToDoList-404_project-not-found');
  }

  return response.success(res, project);
};

const getAll = async (req, res) => {
  
  const user = req.userId;
  try {

    const projectList  = await serviceProject.retrieveProject.getAllByUser(user);

    const returnBody = {
      totalCount : projectList.length,
      results    : projectList
    };

    return response.success(res, returnBody);
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('Error registering project'), 400, 'ToDoList-400_error-register-project');
  }
};


module.exports = {
  getById,
  getAll
};