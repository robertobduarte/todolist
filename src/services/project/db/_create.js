
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');


const create = async (project) => {

  const query = `
      INSERT INTO td_project (
        name,
        user,
        created_at
      ) VALUES (
        ?, ?, NOW()
      )
    `;
  
  const values = [project.name, project.user];
  const result = await mysql.write.query(query, values);
  return result.insertId;
};

module.exports = {
  create
};