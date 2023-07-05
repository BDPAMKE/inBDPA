var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    global.userToken=null;
    req.session=null;
    res.redirect('/');
  });

  module.exports = router;