'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');

//
// exports
const getByEmail = async (email) => {
  const query = `
  SELECT
    id, name, email, password
  FROM
    td_user
  WHERE
    email = ?
  `;
  const values = [email];
  return await mysql.read.queryFirstOrNull(query, values);
};

module.exports = {
  getByEmail
};