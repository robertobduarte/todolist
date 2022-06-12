
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');
 
const remove = async (project) => {

  const query = `
    DELETE FROM 
        td_project
    WHERE 
        id = ?
        AND user = ?
    `;

  const values = [project.id, project.user];
  return await mysql.write.query(query, values);
};

module.exports = {
  remove
};