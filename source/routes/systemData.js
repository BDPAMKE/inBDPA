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
        var articles=data.info.articles;
        var oppcount=data.info.opportunities;
        var sessioncount=data.info.sessions;
        var usercount=data.info.users;
        var viewcount=data.info.views;

        const options = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
            'content-type': 'application/json'
          }};
          
          var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/sessions'; //Setting uri based on user input
      
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
                return "error";
              }
              else 
              {
                console.log(data.sessions)
                sessionsList = data.sessions;
                
                var numHome=0;
                var numAuth=0;
                var numAdmin=0;
                var numProfile=0;
                var numOpportunity=0;
                var numArticle=0;
                
                sessionsList.forEach(session => {
                  if(session.view == "home"){
                    numHome++
                  }
                  if(session.view == "auth"){
                    numAuth++
                  }
                  if(session.view == "admin"){
                    numAdmin++
                  }
                  if(session.view == "profile"){
                    numProfile++
                  }
                  if(session.view == "opportunity"){
                    numOpportunity++
                  }
                  if(session.view == "article"){
                    numArticle++
                  }
                });

                res.render('systemData', { title: 'System Data', articles:articles, opportunities: oppcount, sessions:sessioncount, users:usercount, 
                views:viewcount, role:role, id:id, name:name, numHome:numHome, numAuth:numAuth, numAdmin:numAdmin, numProfile:numProfile, 
                numOpportunity:numOpportunity, numArticle:numArticle  });
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
              return "error";
            })
      }
      else{
        res.render('error', {title: "API Failed", role:role, id:id, name:name});
      }



  })
.catch(error => console.error(error));

//##############################################
});

module.exports = router;
