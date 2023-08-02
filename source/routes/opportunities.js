var express = require('express');
var router = express.Router();
var myScripts = require('../public/javascript/timeConverter.js')

var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

require('dotenv').config();

router.get('/', async (req, res, next) => {
  var afterpoint=req.query.after;
  var prevafter=req.query.prevafter;
  var opportunityInfo = [];

  // if (afterpoint===null || afterpoint===undefined){
  //   afterpoint=0;
  // }

  console.log("Afterpoint:"+afterpoint);

    const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities'; //Setting uri based on user input

    if (afterpoint != null){
        varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities?after=' + afterpoint; //Setting uri based on user input
    }
    else{
      afterpoint=0; //set default afterpoint
    }
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        console.log("link", varHttpRequest)
        console.log("data", data)
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong'});
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunities;
          var opportunityList=[]
          for (var i=0; i<10; i++){
            opportunityList[i]=opportunityInfo[i];
          }
          res.render('opportunities', { title: 'Opportunities', opportunities: opportunityList, after: afterpoint, prevafter: prevafter, utils: myScripts });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
    })

/* GET opportunities page. */

router.get('/:opportunity_id', function(req, res, next) {
  var opportunity_id=req.params.opportunity_id;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/'+opportunity_id; //Setting uri based on user input

    
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong'});
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunity;
          var contentInfo = md.render(opportunityInfo.contents);
          res.render('opportunityContent', { title: opportunityInfo.title, opportunity: opportunityInfo, content: contentInfo });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
    });
  

module.exports = router;
