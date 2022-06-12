'use strict';

//
// dependencies
const db = require('mysql');
const { promisify } = require('util');

//
// pool write
const poolWrite = new db.createPool({
  host            : process.env.DB_WRITE_HOST,
  port            : process.env.DB_PORT,
  database        : process.env.DB_DATABASE,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASSWORD,
  connectionLimit : 10
});

let client = null;

const _connect = async() => {
  if (client === null) {
    const promisifiedGetConnection = promisify(poolWrite.getConnection.bind(poolWrite));
    client = await promisifiedGetConnection();
  }
};

const query = async(query, params = []) => {
  await _connect();
  const rows = await promisify(client.query.bind(client))(query, params);
  return rows;
};

const queryFirstOrNull = async(query, params = []) => {
  await _connect();

  return promisify(client.query.bind(client))(query, params)
    .then(rows => {
      if (rows.length > 0) {
        return rows[0];
      }
      return null;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const queryConnection = (query, params = [], client) => {
  return promisify(client.query.bind(client))(query, params)
    .then(result => {
      return result.rows;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const startTransaction = async() => {
  await _connect();

  return promisify(client.query.bind(client))('BEGIN')
    .then(result => {
      return result;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const commit = async() => {
  await _connect();

  return promisify(client.query.bind(client))('COMMIT')
    .then(result => {
      return result;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

const rollback = async() => {
  await _connect();

  return promisify(client.query.bind(client))('ROLLBACK')
    .then(result => {
      return result;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

module.exports = {
  query,
  queryFirstOrNull,
  queryConnection,
  startTransaction,
  commit,
  rollback
};