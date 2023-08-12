var express = require('express');
var router = express.Router();
var myScripts = require('../public/javascript/timeConverter.js')
var auth = require("../middleware/verifytoken");


var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

require('dotenv').config();

router.get('/', auth, async (req, res, next) => {
  const role=res.locals.role;
  const name=res.locals.result;
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
          res.render('error', { title: 'Error', message: 'Something Went Wrong', });
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunities;
          var opportunityList=[]
          for (var i=0; i<10; i++){
            opportunityList[i]=opportunityInfo[i];
          }
          res.render('opportunities', { title: 'Opportunities', opportunities: opportunityList, after: afterpoint, prevafter: prevafter, utils: myScripts, name: name, role: role });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, name: name, role: role });
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
          res.render('opportunityContent', { title: opportunityInfo.title, opportunity: opportunityInfo, content: contentInfo, name: name, role: role });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, name: name, role: role });
        return "error";
      })
    });

    /* Delete opportunities. */
  
    router.post('/:opportunityId/deleteOpportunity', auth, async (req, res, next) => {
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
          'Content-Type': 'application/json'
        }
      };
  const name=res.locals.result;
  const role=res.locals.role;
      const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
      fetch(varHttpRequest, options)
        .then(response => response.json())
        .then(async data => {
          if (data.success === false){  
            res.render('error', { title: 'Error', message: 'Something Went Wrong', name: name, role: role});
            return "error";
          }
          else 
          {
            res.redirect("/myOpportunities");
          }
        })
        .catch(error => { //Error in the fetch
          console.error(error);
          res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, name: name, role: role });
          return "error";
        })
      })

      /* Edit opportunities. */

      router.post('/:opportunityId/editOpportunity', auth, async (req, res, next) => {
        const newOpportunity = {};
        const name=res.locals.result;
        const role=res.locals.role;
        newOpportunity.title = req.body.editOpportunityTitle;
        newOpportunity.contents = req.body.editOpportunityContent;
      
        var newOpportunityBody = JSON.stringify(newOpportunity);
          const options = {
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
            body: newOpportunityBody
          };
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong', name: name, role: role});
                return "error";
              }
              else 
              {
                res.redirect("/myOpportunities");
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data , name: name, role: role});
              return "error";
            })
          })
  

module.exports = router;
