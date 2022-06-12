'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');

//
// exports
const getAllByUser = async (user) => {
  const query = `
  SELECT
    id, name, created_at
  FROM
    td_project
  WHERE
    user = ?
  `;
  const values = [user];
  return await mysql.read.query(query, values);
};

const getById = async (data) => {
  const query = `
  SELECT
    id, name, created_at
  FROM
    td_project
  WHERE
    id = ? 
    AND user = ?
  `;
  const values = [data.id, data.user];
  return await mysql.read.queryFirstOrNull(query, values);
};

module.exports = {
  getAllByUser,
  getById
};