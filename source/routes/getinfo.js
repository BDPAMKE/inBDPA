var express = require('express');
var router = express.Router();
const myGetRestCall = require("../middleware/GetRestAPI");
const auth = require("../middleware/verifytoken");

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;

 const url = 'https://inbdpa.api.hscc.bdpa.org/v1/info' //- where the URL is whatever Get RestAPI Request  you are calling
 const token = process.env.BEARER_TOKEN;

  //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
  myGetRestCall.getWithBearerToken(url, token)
.then(data => 
 {
  //console.log("REST CALL ", data);
      if (data.success){
        var oppcount=data.info.opportunities;
        var sessioncount=data.info.sessions;
        var usercount=data.info.users;
        var viewcount=data.info.views;
        // res.render('userdata', { title: 'User Data Page', opportunities: oppcount, sessions:sessioncount, users:usercount, views:viewcount });
        res.json(data);
      }
      else{
        res.render('error', {title: "API Failed", role:role, id:id, name:name});
      }
  })
.catch(error => console.error(error));

//##############################################
});

module.exports = router;
