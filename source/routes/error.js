
// catch 404 and forward to error handler
var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

router.get('/', auth, function (req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  res.render('error', { title: '404 page not found', role:role, id:id, name:name });
});

module.exports = router;