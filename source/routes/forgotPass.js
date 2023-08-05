var express = require('express');
var router = express.Router();

const httpRequest = require('https');

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgotPass', { title: 'Forgot Password' });
});

module.exports = router;
