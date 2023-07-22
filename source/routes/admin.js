var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");


/* GET home page. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const username=res.locals.result;
  if (role=="administrator"){
    res.render('admin', { title: 'Admin Access', name:username });
  }
  else{
    res.render('login',{title:"Please login"});
  }
  
});

module.exports = router;