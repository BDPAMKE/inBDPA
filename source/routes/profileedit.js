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
 const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + global.userID //- where the URL is whatever Get RestAPI Request  you are calling
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
      
      res.render('profileedit', { title: 'Profile Page', about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering});
      }
)
.catch(error => console.error(error));
    });

router.post('/', function(req, res, next) {    
      console.log("patch")
      const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + global.userID //- where the URL is whatever Get RestAPI Request  you are calling
      const token = process.env.BEARER_TOKEN;
      console.log ("global user Id",global.userID)
     // const data = req.body
     var startAt= Date.now()
     var endAt= Date.now()
    
     //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
  console.log('request',JSON.stringify(req.body) )
 if(req.body.process == "about") {
  body = '{"sections": {"about": "' +req.body.about +'"}}'
  console.log('print Skills',JSON.stringify(req.body.about)) 

} 


 if(req.body.process == "skills") {
                body = '{"sections": {"skills":["skill1", "skill2", "skills3"]}}'
                console.log('print Skills',JSON.stringify(req.body.skills)) 

 } 
 
 if(req.body.process == "education") {

                body = '{"sections": {"education":[{"title": " '+req.body.title+'","startedAt":'+ startAt+',"endedAt":'+ endAt+',"location":"' + req.body.location + '","description":"' + req.body.description+'"}]}}'
                console.log('print education',JSON.stringify(req.body) )
 }
 
 if(req.body.process == "experience") {

  body = '{"sections": {"experience":[{"title": " '+req.body.title+'","startedAt":'+ startAt+',"endedAt":'+ endAt+',"location":"' + req.body.location + '","description":"' + req.body.description+'"}]}}'
  console.log('print experience',JSON.stringify(req.body)) 
}
 
if(req.body.process == "volunteering") {

  body = '{"sections": {"volunteering":[{"title": " '+req.body.title+'","startedAt":'+ startAt+',"endedAt":'+ endAt+',"location":"' + req.body.location + '","description":"' + req.body.description+'"}]}}'
  console.log('print volunteering',JSON.stringify(req.body)) 
}

 //body = '{"sections": {"about": "' +req.body.about +'","education":[{"title": " '+req.body.title+'","startedAt":'+ startAt+',"endedAt":'+ endAt+',"location":"' + req.body.location + '","description":"' + req.body.description+'"}]}}'
 console.log('print body',JSON.parse(body)) 
  fetch(url, {
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  //body: JSON.stringify({"sections": {"education":[{"title": "Education U2","startedAt": 1689732948656,"endedAt": 1689732948656,"location": "Milwaukee","description": "maybe studied"}]}})
  body: body
})
  .then(response => response.json())
  .then(data =>  {console.log("patch it ",data)
  if(data.success ==true) {
      // if patch is success we need to read the user info. 
      //This function will take the two variables and pass them to the Get RestAPI call 
    /*myGetRestCall.getWithBearerToken(url, token)
    .then(data => { console.log("Reread user ", data)
      varSections = JSON.stringify(data.user.sections)  
      varSections = JSON.parse(varSections)
      varEducation = varSections.education 
      varExperience = varSections.experience   
      varVolunteering = varSections.volunteering     
      varSkills = varSections.skills  
      varAbout =  varSections.about 

     console.log('education',varAbout, " ",varSkills)

         ;
        }
  )
  */
    //res.redirect(request.get('referer'), { title: 'Profile Page: Patch Successful ' ,about:varAbout,education:varEducation});
    res.render('profileedit', { title: 'Profile Page: Patch Successful ' ,about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering});
  
  } else {
    res.render('profileedit', { title: 'Profile Page: Patch failed' , about:varAbout,education:varEducation,experience:varExperience,skills:varSkills,volunteering:varVolunteering});
  }







})
  .catch(error => console.error(error))


}

  
 
);
    
module.exports = router;
