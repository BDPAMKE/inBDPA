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

    const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/articles'; //Setting uri based on user input

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
          articleInfo = data.articles;
          res.render('articles', { title: 'Articles', articles: articleInfo, utils: myScripts, role:role, id:id, name:name });
        }
      })
      .catch(error => { //Error in the fetch
        console.error(error);
        res.render('login', { title: 'Login', message: 'Invalid username or password', data: error.data, role:role, id:id, name:name });
        return "error";
      })
    })

/* GET Articles page. */

router.get('/:article_id', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;

  var canEdit = false;
  var article_id=req.params.article_id;
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'content-type': 'application/json'
    }};
    
    var varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/articles/'+article_id; //Setting uri based on user input
    
    fetch(varHttpRequest, options)
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  
          res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id, name:name});
          return "error";
        }
        else 
        {
          articleInfo = data.article;
          var contentInfo = md.render(articleInfo.contents);
          if(id === articleInfo.creator_id){
            canEdit = true;
          }
          console.log("canEdit", canEdit)
          res.render('articleContent', { title: articleInfo.title, article: articleInfo, content: contentInfo, canEdit:canEdit, role:role, id:id, name:name });
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
