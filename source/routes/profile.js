var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const connection= require("../middleware/ConnectCache");
const { Console } = require('console');
const myPatchRestCall = require('../middleware/PatchRestAPI');
const { request } = require('http');
async function patchRequest(url, token, data) { 
    fetch(url, {
   method: 'PATCH',
   headers: {
     Authorization: `Bearer ${token}`,
     'Content-Type': 'application/json'
   },
   body: {"sections": {"education":[{"title": "Education U2","startedAt": 1689732948656,"endedAt": 1689732948656,"location": "Milwaukee","description": "maybe studied"}]}}
   })
   .then(response => response.json())
   .then(data =>  {console.log("patch",data)
                return data})
   
   .catch(error => console.error(error))
};






/* GET users profile. */
router.get('/', function(req, res, next) {
  // this in you route 
  const url = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + global.userID //- where the URL is whatever Get RestAPI Request  you are calling
  const token = process.env.BEARER_TOKEN;
   console.log ("global user Id",global.userID)
   //########################################## 
  //This function will take the two variables and pass them to the Get RestAPI call 
   myGetRestCall.getWithBearerToken(url, token)
 .then(data => { console.log("user ", data)
   varSections = JSON.stringify(data.user.sections)  
   varSections = JSON.parse(varSections)
   varEducation = varSections.education 
   varExperience = varSections.experience   
   varVolunteering = varSections.volunteering     
   varSkills = varSections.skills  
   varAbout =  varSections.about 
       
       res.render('profile', { title: 'Profile Page', about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering});
       }
 )
 .catch(error => console.error(error));
     }
  
 );

 /* GET users profile. */
router.get('/:userName', function(req, res, next) {
  // this in you route 
  const url = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.params.userName //- where the URL is whatever Get RestAPI Request  you are calling
  const token = process.env.BEARER_TOKEN;
   console.log ("Username",req.params.userName)
   //########################################## 
  //This function will take the two variables and pass them to the Get RestAPI call 
   myGetRestCall.getWithBearerToken(url, token)
 .then(data => { console.log("user ", data)
   varSections = JSON.stringify(data.user.sections)  
   varSections = JSON.parse(varSections)
   varEducation = varSections.education 
   varExperience = varSections.experience   
   varVolunteering = varSections.volunteering     
   varSkills = varSections.skills  
   varAbout =  varSections.about 
       
       res.render('profile', { title: 'Profile Page', about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering});
       }
 )
 .catch(error => console.error(error));
     }
  
 );

 
module.exports = router;
