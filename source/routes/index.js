var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

/* GET home page. */
router.get('/', auth, function (req, res, next) {
  const role=res.locals.role;
  const name=res.locals.result;
  res.render('index', { title: 'InBDPA Home', role: role, name: name  });
});

module.exports = router;
