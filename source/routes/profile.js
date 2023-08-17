var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const auth = require("../middleware/verifytoken");

require('dotenv').config();


/* GET Profile page. */

router.get('/', auth, async (req, res, next) => {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;

  const userId = res.locals.result;
  res.redirect("profile/" + userId)
  })
  

router.get('/:user_id', auth, async (req, res, next) => {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  
  const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
        'content-type': 'application/json'
      },
    };

    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.params.user_id; //Setting uri based on user input
    
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
          return "error";
        }
        else 
        {
            var userInfo = data.user;
            res.render('profile', { title: 'Profile Page', user: userInfo, role:role, id:id, name:name });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
        return "error";
      })
    })

    router.post('/:user_id/editEmail', auth, async (req, res, next) => {
      const role=res.locals.role;
      const id=res.locals.id;
      const name=res.locals.name;

      const newProfile = {};
      newProfile.email = req.body.editProfileEmail;
      
      var newProfileBody = JSON.stringify(newProfile);
        const options = {
          method: 'PATCH',
          headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
            'Content-Type': 'application/json'
          },
          body: newProfileBody
        };
    
        const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.params.user_id; //Setting uri based on user input
    
        fetch(varHttpRequest, options)
          .then(response => response.json())
          .then(async data => {
            if (data.success === false){  
              res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
              return "error";
            }
            else 
            {
              res.render("/profile", {role:role, id:id, name:name});
            }
          })
          .catch(error => { //Error in the fetch
            console.error(error);
            res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
            return "error";
          })
        })

          router.post('/:user_id/editAbout', auth, async (req, res, next) => {
            const role=res.locals.role;
            const id=res.locals.id;
            const name=res.locals.name;
            
            var newProfile = {};
              var sections = {};
              sections.about = req.body.editProfileAbout;
              newProfile = {sections}
              
              var newProfileBody = JSON.stringify(newProfile);
    
                const options = {
                  method: 'PATCH',
                  headers: {
                    'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
                    'Content-Type': 'application/json'
                  },
                  body: newProfileBody
                };
            
                const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.params.user_id; //Setting uri based on user input
            
                fetch(varHttpRequest, options)
                  .then(response => response.json())
                  .then(async data => {
                    console.log("data", data)
                    if (data.success === false){  
                      res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
                      return "error";
                    }
                    else 
                    {
                      res.render("/profile", {role:role, id:id, name:name});
                    }
                  })
                  .catch(error => { //Error in the fetch
                    console.error(error);
                    res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
                    return "error";
                  })
                })


                router.post('/:user_id/editExperience', auth, async (req, res, next) => {
                  const role=res.locals.role;
                  const id=res.locals.id;
                  const name=res.locals.name;
                  
                  var newProfile = {};
                  var sections = {};
                  var experience = {};
                  
                  const startedAt = new Date(req.body.editProfileExperienceStartedAt)
                  const startedAtEpoch = Date.parse(startedAt)

                  const endedAt = new Date(req.body.editProfileExperienceEndedAt)
                  const endedAtEpoch = Date.parse(endedAt)

                  console.log("startedAt", startedAtEpoch)
                  console.log("endedAt", endedAtEpoch)

                  console.log("checkStartDate", new Date(startedAtEpoch))
                  console.log("checkEndDate", new Date(endedAtEpoch))

                  experience.title = req.body.editProfileExperienceTitle;
                  experience.startedAt = parseInt(startedAtEpoch);
                  experience.endedAt = parseInt(endedAtEpoch);
                  experience.location = req.body.editProfileExperienceLocation;
                  experience.description = req.body.editProfileExperienceDescription;
                  sections = {experience}
                  newProfile = {sections}
                  
                  var newProfileBody = JSON.stringify(newProfile);

                  console.log("newProfileBody", newProfileBody)
        
                    const options = {
                      method: 'PATCH',
                      headers: {
                        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
                        'Content-Type': 'application/json'
                      },
                      body: newProfileBody
                    };
                
                    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.params.user_id; //Setting uri based on user input
                
                    fetch(varHttpRequest, options)
                      .then(response => response.json())
                      .then(async data => {
                        console.log("data", data)
                        if (data.success === false){  
                          res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
                          return "error";
                        }
                        else 
                        {
                          res.render("/profile", {role:role, id:id, name:name});
                        }
                      })
                      .catch(error => { //Error in the fetch
                        console.error(error);
                        res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
                        return "error";
                      })
                    })
        

module.exports = router;



