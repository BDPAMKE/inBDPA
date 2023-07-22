var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const connection= require("../middleware/ConnectCache");
const { Console } = require('console');
const myPatchRestCall = require('../middleware/PatchRestAPI');
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
    const data=' {"sections": {"about": "test ed 2"}}'
     console.log("body", data) 
 
     //########################################## 
 //This function will take the two variables and pass them to the Get RestAPI call 
 /*
 myPatchRestCall.patchWithBearerToken(url, token, data)
        .then(data => {console.log("Profile edit",data)
        res.render('profileedit', { title: 'Profile Page return', });
    }
        
        )
        .catch(error => console.error(error));
       
      
      });
      
  */  
    
    
    
    
    
    
    });
    
module.exports = router;
