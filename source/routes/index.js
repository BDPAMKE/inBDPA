var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");

/* GET home page. */
router.get('/', function (req, res, next) {
  const url = 'https://inbdpa.api.hscc.bdpa.org/v1/info' 
  const token = process.env.BEARER_TOKEN;
  var usercount = 0;
  myGetRestCall.getWithBearerToken(url, token)
    .then(data => {
      if (data.success) {
        console.log("data =", data);
        var oppcount = data.info.opportunities;
        var sessioncount = data.info.sessions;
        usercount = data.info.users;
        // var usercount = data.info.users;
        var viewcount = data.info.views;
      }
      else {
        res.render('error', { title: "API Failed" });
      }
    })
    .catch(error => console.error(error));
  console.log("users =", usercount);
  res.render('index', { title: 'InBDPA Home' });
});

module.exports = router;