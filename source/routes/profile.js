var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const auth = require("inBDPA/source/middleware/verifytoken");

require('dotenv').config();


/* GET Profile page. */

router.get('/', auth, async (req, res, next) => {

  const role = res.locals.role;
  const userId = res.locals.result;

  if (role!=="public"){

  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    },
  };

  const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + userId; //Setting uri based on user input
  
  fetch(varHttpRequest, options)
    .then(response => response.json())
    .then(async data => {
      if (data.success === false){  
        res.render('error', { title: 'Error', message: 'Something Went Wrong'});
        return "error";
      }
      else 
      {
          var userInfo = data.user;
          res.render('profile', { title: 'Profile Page', user: userInfo });
      }
    })
    .catch(error => { //Error in the fetch
      console.error(error);
      res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
      return "error";
    })
  }
  else{
    res.redirect('/login');
  }
  })
  

router.get('/:user_id', async (req, res, next) => {

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
          res.render('error', { title: 'Error', message: 'Something Went Wrong'});
          return "error";
        }
        else 
        {
            var userInfo = data.user;
            res.render('profile', { title: 'Profile Page', user: userInfo });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
    })

module.exports = router;



