'use strict';

//
// common api
const { express }            = require('common-api');
const i18n                   = require('./i18n');
const errorMiddleware        = require('./middlewares/error.middleware');
const timezoneMiddleware     = require('./middlewares/timezone.middleware');

//
// initialize i18n
express.instance.use(i18n.init);

//
// initialize error middleware
express.instance.use(errorMiddleware);
express.instance.use(timezoneMiddleware);

//
// routes
const basePath = '/v1';
const routes   = require('./routes/index.js');

routes.init(express.instance, basePath);

//
// express
express.init();
module.exports = express.instance;