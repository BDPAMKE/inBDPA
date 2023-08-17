var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const connection= require("../middleware/ConnectCache");

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  
  // this in you route 
 const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users' //- where the URL is whatever Get RestAPI Request  you are calling
 const token = process.env.BEARER_TOKEN;

  //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
  myGetRestCall.getWithBearerToken(url, token)
.then(data => {
  data.users.forEach(element => {element.gravatar=crypto.createHash('md5').update(element.email).digest("hex")});
  res.render('users', { title: 'Test page', resultarray:data.users, role:role, id:id, name:name});
  })
});

router.post('/', auth, async (req, res, next) => {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;

  const options = {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'Content-Type': 'application/json'
    }
  };

  var userId = req.body.userid;

  const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + userId; //Setting uri based on user input
  
  console.log("varHttpRequest", varHttpRequest);

  fetch(varHttpRequest, options)
    .then(response => response.json())
    .then(async data => {
      if (data.success === false){  
        res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name });
        return "error";
      }
      else 
      {
        res.redirect("/users");
      }
    })
    .catch(error => { //Error in the fetch
      console.error(error);
      res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
      return "error";
    })
  })

module.exports = router;
