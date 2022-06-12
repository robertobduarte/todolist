'use strict';

const timezone = async (req, res, next) => {
  req.currentTimezone = req.headers['x-user-timezone'] || 'America/Sao_Paulo';
  next();
};

module.exports = timezone;
