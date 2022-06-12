
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');

const create = async (user) => {

  const query = `
    INSERT INTO td_user (
      name,
      email,
      password,
      created_at
    ) VALUES (
      ?,?,?,now()
    )
  `;
  const values = [
    user.name,
    user.email,
    user.password
  ];

  const result = await mysql.write.query(query, values);
  return result.insertId;
};

module.exports = {
  create
};