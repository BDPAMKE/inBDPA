var express = require('express');
var router = express.Router();
//This is a test  from main to amazon
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'InBDPA Home' });
});

module.exports = router;
