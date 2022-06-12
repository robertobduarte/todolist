
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');


const create = async (task) => {

  const query = `
      INSERT INTO td_task (
        name,
        description,
        created_at,
        project
      ) VALUES (
        ?, ?, NOW(), ?
      )
    `;
  
  const values = [task.name, task.description, task.project];
  const result = await mysql.write.query(query, values);
  return result.insertId;
};

module.exports = {
  create
};