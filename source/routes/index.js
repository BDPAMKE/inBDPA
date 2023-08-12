var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

/* GET home page. */
router.get('/', auth, function (req, res, next) {
  const role=res.locals.role;
  console.log('role: ', role);
  res.render('index', { title: 'InBDPA Home', role: role  });
});

module.exports = router;
