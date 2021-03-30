const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const { CustomError, BadRequest } = require('throw.js');
const logger = require('winston');
const errors = require('./error');

const getLogin = (req, res, next) => {
  console.log(' rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ');
  try {

    let a = 10;
    let b =20;
    let c = a+b;
    return c;
  //  b;
  } catch (e) {
    // req.params.error = 'Custom';
    req.params.error = 'NotFound';
    // throw new CustomError("message custom ", e.statusCode, e.errorCode, e);
    next(new BadRequest(' in valid error follow'));
    //  throw next(errors.getError(req,res,next))  ;
  }
};

router.get('/', getLogin);

router.use((err, req, res, next) => {
  logger.error(err);

  if (req.app.get('env') !== 'development' && req.app.get('env') !== 'test') {
    delete err.stack;
  }

  res.status(err.statusCode || 500).json(err);
});

// app use caller

module.exports = {
  router,
  getLogin,
};
