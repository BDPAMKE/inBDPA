var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

/* GET home page. */
router.get('/',auth, function (req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  res.render('index', { title: 'InBDPA Home',role:role,id:id,name:name });
});

module.exports = router;
