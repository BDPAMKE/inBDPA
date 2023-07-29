var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const httpRequest = require('https');
const auth = require("../middleware/verifytoken");

var incrementOpportunityView = require('../middleware/viewManager/viewsManager.js');
var startSession = require('../middleware/sessionManager/startSession.js');

require('dotenv').config();

/* GET opportunity page. */

router.get('/:opportunity_id', function(req, res, next) {
  var opportunityInfo = [];

    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
        'content-type': 'application/json'
      },
    };
    
    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + req.params.opportunityId; //Setting uri based on user input
    
      fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong'});
          return "error";
        }
        else 
        { 
          var opportunityPageInfo = data.opportunity;
          var contentInfo = md.render(opportunityPageInfo.contents);
          
          var sessionId = await startSession("opportunity", req.params.opportunityId);
          console.log("sessionId in route", sessionId);
          incrementOpportunityView(varHttpRequest);
         
          res.render('opportunityPage', { title: 'Opportunity Page', opportunityPage: opportunityPageInfo, content: contentInfo });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
    })

    /* Delete opportunities. */
  
    router.post('/:opportunityId/deleteOpportunity', async (req, res, next) => {
      
      const options = {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
          'Content-Type': 'application/json'
        }
      };
  
      const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
      fetch(varHttpRequest, options)
        .then(response => response.json())
        .then(async data => {
          if (data.success === false){  
            res.render('error', { title: 'Error', message: 'Something Went Wrong'});
            return "error";
          }
          else 
          {
            res.redirect("/myOpportunities");
          }
        })
        .catch(error => { //Error in the fetch
          console.error(error);
          res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
          return "error";
        })
      })

      /* Edit opportunities. */

      router.post('/:opportunityId/editOpportunity', auth, async (req, res, next) => {
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
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities/' + req.params.opportunityId; //Setting uri based on user input
      
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
              else 
              {
                res.redirect("/myOpportunities");
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
          })

module.exports = router;
