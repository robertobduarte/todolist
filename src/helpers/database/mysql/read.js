'use strict';

//
// dependencies
const db = require('mysql');

//
// pool read
const poolRead = new db.createPool({
  host            : process.env.DB_READ_HOST,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  database        : process.env.DB_DATABASE,
  connectionLimit : process.env.NODE_ENV === 'local' ? 1 : 10
});

const query = (query, params = []) => {
  return new Promise(function(resolve, reject) {
    poolRead.query(query, params, function(err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

const queryFirstOrNull = (query, params = []) => {
  return new Promise(function(resolve, reject) {
    poolRead.query(query, params, function(err, rows) {
      if (err) {
        reject(err);
      } else if (rows.length > 0) {
        resolve(rows[0]);
      } else {
        resolve(null);
      }
    });
  });
};

module.exports = {
  query,
  queryFirstOrNull
};