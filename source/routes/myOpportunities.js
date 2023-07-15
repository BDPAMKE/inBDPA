var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();

const auth = require("inBDPA/source/middleware/verifytoken");

require('dotenv').config();

/* GET My Opportunities page. */

router.get('/', auth, async (req, res, next) => {
    const role=res.locals.role;
    const userId = res.locals.result;

    if (role!=="public"){
        var myOpportunityList = [];
          const options = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
            'content-type': 'application/json'
          }};
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities'; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong'});
                return "error";
              }
              else 
              {
                const opportunityList = data.opportunities;
                opportunityList.forEach(opportunity => {
                    if(opportunity.creator_id == userId){
                        myOpportunityList.push(opportunity);
                    }
                  });
                  res.render('myOpportunities', { title: 'Opportunities', opportunities: myOpportunityList });
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
              return "error";
            })
    }
    else{
        res.redirect('/login');
    }
    })

    /* POST opportunities. */

    router.post('/', auth, async (req, res, next) => {
        const newOpportunity = {};
        newOpportunity.title = req.body.createOpportunityTitle;
        newOpportunity.contents = req.body.createOpportunityContent;
        newOpportunity.creator_id = res.locals.result;
      
        var newOpportunityBody = JSON.stringify(newOpportunity);
          const options = {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
            body: newOpportunityBody
          };
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/opportunities'; //Setting uri based on user input
          
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



