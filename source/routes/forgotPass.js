var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('forgotPass', { title: 'Forgot Password' });
});

router.post('/', function(req, res, next) {
  var username=req.body.uname;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};

    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users' + username; //Setting uri based on user input
    
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        console.log("data", data)
        if ((data.success === false) && (data.error === "resource was not found")){  
          alert("User Was NOT Found. Please Try Again.")
        }
        else 
        {
          alert("Verification Email Sent");
          res.render('login', { title: 'Login' });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })

});



module.exports = router;
