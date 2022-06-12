
'use strict';

//
// services
const jwt = require('jsonwebtoken');

//
// exports
const sign = async (payload) => {
  const secret = process.env.SECRET;
  return await jwt.sign(payload, secret, {
    expiresIn: 7200 // expires in 2 hours
  });
};



module.exports = {
  sign
};