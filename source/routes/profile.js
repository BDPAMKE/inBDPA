var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const connection= require("../middleware/ConnectCache");
const { Console } = require('console');
const myPatchRestCall = require('../middleware/PatchRestAPI');
const { request } = require('http');

// async function patchRequest(url, token, data) { 
//     fetch(url, {
//    method: 'PATCH',
//    headers: {
//      Authorization: `Bearer ${token}`,
//      'Content-Type': 'application/json'
//    },
//    body: {"sections": {"education":[{"title": "Education U2","startedAt": 1689732948656,"endedAt": 1689732948656,"location": "Milwaukee","description": "maybe studied"}]}}
//    })
//    .then(response => response.json())
//    .then(data =>  {console.log("patch",data)
//                 return data})
   
//    .catch(error => console.error(error))
// };

/* GET users profile. */
router.get('/', auth, async (req, res, next) => {
  const userId = res.locals.result;
  res.redirect("/profile/" + userId)
  })


 /* GET users profile. */
router.get('/:userName', function(req, res, next) {
  // this in you route 
  const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + req.params.userName //- where the URL is whatever Get RestAPI Request  you are calling
  const token = process.env.BEARER_TOKEN;
   console.log ("Username",req.params.userName)
   //########################################## 
  //This function will take the two variables and pass them to the Get RestAPI call 
   myGetRestCall.getWithBearerToken(url, token)
 .then(data => { console.log("user ", data)
 varUser_id = data.user.user_id
 varUsername = data.user.username; 
  varEmail = data.user.email; 
  varFullName = data.user.fullName;
  varType = data.user.type;
  varViews = data.user.views;
   varSections = JSON.stringify(data.user.sections)  
   varSections = JSON.parse(varSections)
   varEducation = varSections.education 
   varExperience = varSections.experience   
   varVolunteering = varSections.volunteering     
   varSkills = varSections.skills  
   varAbout =  varSections.about 
       
  res.render('profile', { title: 'Profile Page', varUsername:varUsername, varEmail:varEmail, varFullName:varFullName, varType:varType, varViews:varViews, 
    about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering, varUser_id:varUser_id});
  })
 .catch(error => console.error(error));
  });

  router.post('/:userId/deleteUser', auth, async (req, res, next) => {
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
  
    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + req.params.userId; //Setting uri based on user input
    
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
          res.redirect("/login");
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
        return "error";
      })
    })
  

 
module.exports = router;
