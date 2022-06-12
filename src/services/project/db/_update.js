
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');
 
const update = async (project) => {

  const query = `
    UPDATE 
        td_project 
        set name = ?
    WHERE 
        id = ?
        AND user = ?
    `;


  const values = [project.name, project.id, project.user];
  const result = await mysql.write.query(query, values);
  return result;
};

module.exports = {
  update
};