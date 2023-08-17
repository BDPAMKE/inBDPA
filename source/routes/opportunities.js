var express = require('express');
var router = express.Router();
const auth = require("../middleware/verifytoken");
var myScripts = require('../public/javascript/timeConverter.js');

var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

require('dotenv').config();

router.get('/', auth, async (req, res, next) => {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  
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
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/opportunities'; //Setting uri based on user input

    if (afterpoint != null){
        varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/opportunities?after=' + afterpoint; //Setting uri based on user input
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
          res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunities;
          var opportunityList=[]
          for (var i=0; i<10; i++){
            opportunityList[i]=opportunityInfo[i];
          }
          res.render('opportunities', { title: 'Opportunities', opportunities: opportunityList, after: afterpoint, prevafter: prevafter, utils: myScripts, role:role, id:id, name:name });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
        return "error";
      })
    })

/* GET opportunities page. */

router.get('/:opportunity_id', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;

  var canEdit = false;
  var opportunity_id=req.params.opportunity_id;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/opportunities/'+opportunity_id; //Setting uri based on user input
    
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
          return "error";
        }
        else 
        {
          opportunityInfo = data.opportunity;
          var contentInfo = md.render(opportunityInfo.contents);
          if(id === opportunityInfo.creator_id){
            canEdit = true;
          }
          console.log("canEdit", canEdit)
          res.render('opportunityContent', { title: opportunityInfo.title, opportunity: opportunityInfo, content: contentInfo, canEdit:canEdit, role:role, id:id, name:name });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
        return "error";
      })
    });

    /* Delete opportunities. */
  
    router.post('/:opportunityId/deleteOpportunity', auth, async (req, res, next) => {
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
  
      const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
      fetch(varHttpRequest, options)
        .then(response => response.json())
        .then(async data => {
          if (data.success === false){  
            res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name });
            return "error";
          }
          else 
          {
            res.redirect("/myOpportunities", {role:role, id:id, name:name});
          }
        })
        .catch(error => { //Error in the fetch
          console.error(error);
          res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
          return "error";
        })
      })

      /* Edit opportunities. */

      router.post('/:opportunityId/editOpportunity', auth, async (req, res, next) => {
        const role=res.locals.role;
        const id=res.locals.id;
        const name=res.locals.name;

        const newOpportunity = {};
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
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
                return "error";
              }
              else 
              {
                res.redirect("/myOpportunities", {role:role, id:id, name:name});
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
              return "error";
            })
          })
  

module.exports = router;
