var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const httpRequest = require('https');
const auth = require("../middleware/verifytoken");

require('dotenv').config();

/* GET opportunities page. */

router.get('/', async (req, res, next) => {
  var afterpoint=req.query.after;
  console.log(req.query.after);
  var opportunityInfo = [];

    const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities'; //Setting uri based on user input
    if (afterpoint != null){
        varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities?after='+afterpoint; //Setting uri based on user input

    }
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong'});
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunities;
          res.render('opportunities', { title: 'Opportunities', opportunities: opportunityInfo });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
    })

module.exports = router;
