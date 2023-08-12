var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");


/* GET home page. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const name=res.locals.result;
  if (role=="administrator"){
    res.render('admin', { title: 'Admin Access', name:name, role: role  });
  }
  else{
    res.render('login',{title:"Please login", name:name, role: role});
  }
  
});

module.exports = router;