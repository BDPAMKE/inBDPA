var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");

/* GET users listing. */
router.get('/', function(req, res, next) {
 // this in you route 
 const url = 'https://inbdpa.api.hscc.bdpa.org/v1/users/mkelen2' //- where the URL is whatever Get RestAPI Request  you are calling
 const token = process.env.BEARER_TOKEN;
console.log ("before call",token)
  //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
  myGetRestCall.getWithBearerToken(url, token)
.then(data => {
  //data.users.forEach(element => element.gravatar=crypto.createHash('md5').update(element.email).digest("hex"));
  var results = data
  console.log('data ',data.user.sections)
  var about=data.user.sections.about
  var education=JSON.stringify (data.user.sections.education)
  var skills=JSON.stringify (data.user.sections.skills)
  var volunteering=JSON.stringify (data.user.sections.volunteering)
  var experience=JSON.stringify (data.user.sections.experience)



  console.log('education',education)
  res.render('profile', { title: 'User Profile', about:about,education:education,experience:experience,volunteering:volunteering,skills:skills});
  } 
)
.catch(error => console.error(error));
});

module.exports = router;
