var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const connection= require("../middleware/ConnectCache");

/* GET users listing. */
router.get('/', function(req, res, next) {
  
 const url = 'https://inbdpa.api.hscc.bdpa.org/v1/users' //- where the URL is whatever Get RestAPI Request  you are calling
 const token = process.env.BEARER_TOKEN;

 //This function will take the two variables and pass them to the Get RestAPI call 
  myGetRestCall.getWithBearerToken(url, token)
.then(data => {
  data.users.forEach(element => {element.gravatar=crypto.createHash('md5').update(element.email).digest("hex");
        }
  );
  res.render('users', { title: 'Test page', resultarray:data.users});
  } 
)
.catch(error => console.error(error));
});

module.exports = router;
