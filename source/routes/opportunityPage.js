const { startSession } = require('../public/javascript/startSession');
const { viewSession } = require('../public/javascript/viewSession');


var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const httpRequest = require('https');

require('dotenv').config();


/* GET opportunity page. */

router.get('/:opportunityId', async (req, res, next) => {
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
          // startSession("opportunity", req.params.opportunityId);
          // var activeSessions = viewSession(opportunityId);
          var opportunityPageInfo = data.opportunity;
          var contentInfo = md.render(opportunityPageInfo.contents);
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

module.exports = router;



