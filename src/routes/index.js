const express = require('express');

const router = express.Router();
const bodyParser = require('body-parser');
const errors = require('throw.js');

// set up parsers

router.use(bodyParser.json());

// Express routes

router.use('/login', require('./login').router);

// this is api error handling not requires for production

router.use('/error', require('./error').router);

// default which will throw a 404 notfound error
router.use((req, res, next) => {
  console.log(' eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  next(new errors.NotFound());
});

// Error handler for API
// router.use((err,req,res,next)=>{

//     next(new errors.NotFound());
//     res.status(err.statusCode || 500).json(err);
// })

module.exports = router;
