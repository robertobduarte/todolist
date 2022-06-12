
'use strict';

//
// services
const serviceJwt = require('../jwt');

//
// exports
const create = async (user) => {
  return await serviceJwt.generateToken.sign(user);
};



module.exports = {
  create
};