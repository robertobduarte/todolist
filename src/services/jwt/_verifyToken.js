
'use strict';

//
// services
const jwt = require('jsonwebtoken');

//
// exports
const verify = async (token) => {
  const secret = process.env.SECRET;
  return await jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return false; 
    }
    return decoded.id;
  });
};

module.exports = {
  verify
};