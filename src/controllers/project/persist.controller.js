
'use strict';

//
// dependencies
const { validator, response, error } = require('common-api');
const i18n = require('../../i18n');
//
// services
const serviceProject = require('../../services/project');

//
// private
const _validateCreateBody = (body) =>{
  const createSchema = {
    'id'         : '/CreateProject',
    'type'       : 'object',
    'properties' : {
      'name': {'type': 'string'}
    },
    'required': ['name']
  };
  return validator.validate(createSchema, body);
};

const _validateEditBody = (body) =>{
  const editSchema = {
    'id'         : '/EditProject',
    'type'       : 'object',
    'properties' : {
      'name': {'type': 'string'}
    },
    'required': ['name']
  };
  return validator.validate(editSchema, body);
};


//
// exports
const create = async (req, res) => {
  const { name } = _validateCreateBody(req.body);

  try {
    const project = {
      name : name,
      user : req.userId
    };

    const projectCreated = await serviceProject.createProject.create(project);
    project.id = projectCreated.id;

    return response.success(res, project, 201);
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('Error registering project'), 400, 'ToDoList-400_error-register-project');
  }
};

const edit = async (req, res) => {
  const { name }  = _validateEditBody(req.body);
  const { id }    = req.params;

  if (!id) {
    throw new error.HttpError(i18n.__('ToDoList-403_missing-project-id'), 403, 'ToDoList-403_missing-project-id');
  }

  const project = {
    id   : id,
    name : name,
    user : req.userId
  };

  try {

    const projectUpdated = await serviceProject.updateProject.update(project);
    if (!projectUpdated) {
      throw new error.HttpError(i18n.__('ToDoList-401_error_update-project'), 401, 'ToDoList-401_error_update-project');
    }
    return response.success(res, project);    
    
  } catch (err) {
    if (err.name === 'HttpError') {
      throw err;
    }
    throw new error.HttpError(i18n.__('Error registering project'), 400, 'ToDoList-400_error-register-project');
  }
};


const remove = async (req, res) => {
  const { id } = req.params;

  const data = {
    id   : id,
    user : req.userId
  };
  
  const project = await serviceProject.retrieveProject.getById(data);

  if (!project) {
    throw new error.HttpError(i18n.__('ToDoList-404_project-not-found'), 404, 'ToDoList-404_project-not-found');
  }
  
  await serviceProject.removeProject.remove(data);
  return response.success(res, null, 204);
};

module.exports = {
  create,
  edit,
  remove
};