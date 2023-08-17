var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");

/* GET users listing. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
 
  // this in your route 
 const url = 'https://inbdpa.api.hscc.bdpa.org/v2/info' //- where the URL is whatever Get RestAPI Request  you are calling
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
        res.render('systemData', { title: 'System Data', opportunities: oppcount, sessions:sessioncount, users:usercount, views:viewcount, role:role, id:id, name:name });
      }
      else{
        res.render('error', {title: "API Failed", role:role, id:id, name:name});
      }



  })
.catch(error => console.error(error));

//##############################################
});

module.exports = router;
