
'use strict';

//
// dependencies
const { validator, response, error } = require('common-api');
const i18n = require('../../i18n');
//
// services
const serviceTask = require('../../services/task');
const serviceProject = require('../../services/project');

//
// private
const _validateCreateBody = (body) =>{
  const createSchema = {
    'id'         : '/CreateProject',
    'type'       : 'object',
    'properties' : {
      'name'        : {'type': 'string'},
      'description' : {'type': 'string'},
      'project'     : {'type': 'number'}
    },
    'required': ['name', 'project']
  };
  return validator.validate(createSchema, body);
};

const _validateEditBody = (body) =>{
  const editSchema = {
    'id'         : '/EditProject',
    'type'       : 'object',
    'properties' : {
      'name'        : {'type': 'string'},
      'description' : {'type': 'string'},
      'finished_at' : {'type': 'string'}
    }
  };
  return validator.validate(editSchema, body);
};


//
// exports
const create = async (req, res) => {
  const task = _validateCreateBody(req.body);
  const user = req.userId;

  const project = await serviceProject.retrieveProject.getById({ 'id': task.project, 'user': user});
  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-401_unauthorized'), 401, 'ToDoList-401_unauthorized');
  }

  try {
    const taskCreated = await serviceTask.createTask.create(task);
    task.id = taskCreated.id;

    return response.success(res, task, 201);
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('ToDoList-400_error-creating-task'), 400, 'ToDoList-400_error-creating-task');
  }
};

const edit = async (req, res) => {
  const dataTask  = _validateEditBody(req.body);
  const { id }    = req.params;
  const user = req.userId;

  if (!id) {
    throw new error.HttpError(i18n.__('ToDoList-403_missing-task-id'), 403, 'ToDoList - 403 - missing task id');
  }

  const taskVerify = await serviceTask.retrieveTask.getById({'id': id, 'user': user});

  if (taskVerify.finished_at) {
    throw new error.HttpError(i18n.__('ToDoList-401_unauthorized'), 401, 'ToDoList-401_unauthorized');
  }

  const project = await serviceProject.retrieveProject.getById({ 'id': taskVerify.project, 'user': user});
  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-401_unauthorized'), 401, 'ToDoList-401_unauthorized');
  }

  dataTask.id = taskVerify.id;

  try {

    const taskUpdated = await serviceTask.updateTask.update(dataTask);
    if (!taskUpdated) {
      throw new error.HttpError(i18n.__('ToDoList-401_error_update-project'), 401, 'ToDoList-401_error_update-project');
    }
    return response.success(res, dataTask);

  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('ToDoList-400_error-update-task'), 400, 'ToDoList-400_error-update-task');
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = req.userId;

  const task = await serviceTask.retrieveTask.getById({'id': id, 'user': user});
  if (task.finished_at) {
    throw new error.HttpError(i18n.__('ToDoList-401_unauthorized'), 401, 'ToDoList-401_unauthorized');
  }

  const project = await serviceProject.retrieveProject.getById({ 'id': task.project, 'user': user});
  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-401_unauthorized'), 401, 'ToDoList-401_unauthorized');
  }

  await serviceTask.removeTask.remove(task.id);
  return response.success(res, null, 204);
};

module.exports = {
  create,
  edit,
  remove
};