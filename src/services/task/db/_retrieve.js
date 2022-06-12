'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');

//
// exports
const getAllOfTheProject = async (project) => {
  const query = `
  SELECT
    id, name, description, created_at, finished_at
  FROM
    td_task
  WHERE
    project = ?
  `;
  const values = [project];
  return await mysql.read.query(query, values);
};

const getById = async (id) => {
  const query = `
  SELECT
    id, name, description, created_at, finished_at, project
  FROM
    td_task
  WHERE
    id = ?
  `;
  const values = [id];
  return await mysql.read.queryFirstOrNull(query, values);
};

module.exports = {
  getAllOfTheProject,
  getById
};