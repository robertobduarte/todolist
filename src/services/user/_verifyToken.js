
'use strict';

//
// services
const serviceJwt = require('../jwt');

//
// exports
const verify = async (token) => {
  return await serviceJwt.verifyToken.verify(token);
};


module.exports = {
  verify
};