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
  //data.users.forEach(element => {element.gravatar=crypto.createHash('md5').update(element.email).digest("hex");
      //var sections_about = data.user.sections.about
      //var sections_eduction = data.user.sections.eductaion        
       res.render('profileedit', { title: 'Profile Page', about:data.user.sections.about,education:data.user.sections.eductaion});
      }
)
.catch(error => console.error(error));
    });

router.post('/', function(req, res, next) {    
      console.log("patch")
      const url = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + global.userID //- where the URL is whatever Get RestAPI Request  you are calling
      const token = process.env.BEARER_TOKEN;
      console.log ("global user Id",global.userID)
     // const data = req.body
     var startAt= Date.now()
     var endAt= Date.now()
    // const data = '{"sections": {"education": ["test","1690005402388","1690005402388","mke","test"]}'
    //const data='{"sections": {"education":[{"title": "Education U3","startedAt": 1689732948656,"endedAt": 1689732948656,"location": "Milwaukee","description": "maybe studied"}]}}'
    // console.log("body", data) 
 
     //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
  body = '{"sections": {"education":[{"title": " '+req.body.title+'","startedAt":'+ startAt+',"endedAt":'+ endAt+',"location":"' + req.body.location + '","description":"' + req.body.description+'"}]}}'
  //console.log('print body',body) 
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
    myGetRestCall.getWithBearerToken(url, token)
    .then(data => { console.log("Reread user ", data)
      varSections = JSON.stringify(data.user.sections)  
      varSections = JSON.parse(varSections)
      varabout = data.user.sections.about
     

     console.log('education',varSections.education[0].title)

         ;
        }
  )
    //res.render('profileedit', { title: 'Profile Page', about:varabout,education:varEducation})
    res.render('profileedit', { title: 'Profile Page: Patch Successful ' , about:"about",education:"data.user.sections"});
  
  } else {
    res.render('profileedit', { title: 'Profile Page: Patch failed' , about:"about",education:"data.user.sections"});
  }







})
  .catch(error => console.error(error))


}

  
 
);
    
module.exports = router;
