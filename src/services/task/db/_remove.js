
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');
 
const remove = async (id) => {

  const query = `
    DELETE FROM 
        td_task
    WHERE 
        id = ?
    `;

  const values = [id];
  return await mysql.write.query(query, values);
};

module.exports = {
  remove
};