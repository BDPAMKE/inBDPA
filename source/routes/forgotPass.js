var express = require('express');
var router = express.Router();

const httpRequest = require('https');
const auth = require("../middleware/verifytoken");

require('dotenv').config();

/* GET home page. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const name=res.locals.result;
  res.render('forgotPass', { title: 'Forgot Password', role: role, name: name });
});

module.exports = router;
