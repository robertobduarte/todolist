
'use strict';

//
// commom api
const mysql = require('../../../helpers/database/mysql');

const update = async (task) => {

  let query = ' UPDATE td_task SET ';
  let i = 0;
  const values = [];

  for (var property in task) {
    if (property !== 'id') {
      if (i >= 1) {
        query += ', ';
      }
      query += ` ${property} = ?`;
      i += 1;
      values.push(task[property]);
    }
  }

  query += ' WHERE id = ? ';
  values.push(task.id);

  const result = await mysql.write.query(query, values);
  return result;
};

module.exports = {
  update
};