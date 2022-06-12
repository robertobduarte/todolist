
'use strict';

//
// common api
const { response, error } = require('common-api');

const i18n = require('../../i18n');

//
// services
const serviceTask = require('../../services/task');
const serviceProject = require('../../services/project');
//
// exports
const getById = async (req, res) => {
  const { id } = req.params;
  const user = req.userId;

  const task = await serviceTask.retrieveTask.getById({ 'id': id, 'user': user});
  if (!task) {
    throw new error.HttpError(i18n.__('ToDoList-404_task-not-found'), 404, 'ToDoList-404_task-not-found');
  }

  return response.success(res, task);
};

const getAll = async (req, res) => {
  const { project } = req.query;
  const user = req.userId;

  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-403_missing-project'), 403, 'ToDoList-403_missing-project');
  }

  const projectByUser = await serviceProject.retrieveProject.getById({ 'id': project, 'user': user});
  if (!projectByUser) {
    throw new error.HttpError(i18n.__('ToDoList-404_project-not-found'), 404, 'ToDoList-404_project-not-found');
  }

  try {   

    const tasksOfTheProject  = await serviceTask.retrieveTask.getAllOfTheProject(project);
    const returnBody = {
      totalCount : tasksOfTheProject.length,
      results    : tasksOfTheProject
    };

    return response.success(res, returnBody);
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('Error finding tasks'), 400, 'ToDoList-400_error-finding-tasks');
  }
};


module.exports = {
  getById,
  getAll
};