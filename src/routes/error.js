// 'use strict'
// this file is not required at all
const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const errors = require('throw.js');

// Middleware that is specific to this route

router.use(bodyParser.json());

const getError = async function (req, res, next) {
  console.log(` reaached to error handler file ${req.params.error}`);
  switch (req.params.error) {
    case 'Custom':
      // errors.customError (slug, message,statusCode, errorCode)
      // res.json(new CustomError('CustomError', 'This is a custom Error message ',900,900))
      next(new errors.CustomError('CustomError', 'This is a custom Error message ', 400, 400));
      break;
    case '400':
    case 'BadRequest':
      next(new errors.BadRequest());
      break;
    case '404':
    case 'NotFound':
    default:
      next(new errors.NotFound());
  }
};

// root
router.get('/:error', getError);

module.exports = {
  router,
  getError,
};
