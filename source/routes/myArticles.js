var express = require('express');
var router = express.Router();

var myScripts = require('../public/javascript/timeConverter.js');
const auth = require("../middleware/verifytoken");

require('dotenv').config();

/* GET My Articles page. */

router.get('/', auth, async (req, res, next) => {
    const role=res.locals.role;
        const id=res.locals.result;
        const name=res.locals.name;
        console.log("id", id);

    if ((role==="staff") || (role==="administrator")){
        var myArticleList = [];
          const options = {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
            'content-type': 'application/json'
          }};
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/articles'; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id});
                return "error";
              }
              else 
              {
                console.log("data", data)
                const articleList = data.articles;
                console.log("articleList", articleList)

                articleList.forEach(article => {
                    console.log("articleLOOP", article)
                    console.log("article.creator_id", article.creator_id)
                    console.log("id", id)
                    if(article.creator_id === id){
                        myArticleList.push(article);
                    }
                  });
                  
                  res.render('myArticles', { title: 'My Articles', articles: myArticleList, utils: myScripts, role:role, id:id });
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id });
              return "error";
            })
    }
    else{
        res.redirect('/login');
    }
    })

    /* POST Articles. */

    router.post('/', auth, async (req, res, next) => {
        const id=global.userID;
        const name=res.locals.name;
        console.log("id", id);
        console.log("globalid", globalid);

        const newArticle = {};
        newArticle.title = req.body.createArticleTitle;
        newArticle.contents = req.body.createArticleContent;
        newArticle.creator_id = id;
        newArticle.keywords = [String(req.body.createArticleKeywords)];
      
        var newArticleBody = JSON.stringify(newArticle);
        console.log('1:', newArticleBody);
          const options = {
            method: 'POST',
            headers: {
              'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
              'Content-Type': 'application/json'
            },
            body: newArticleBody
          };
      
          const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v2/articles'; //Setting uri based on user input
          
          fetch(varHttpRequest, options)
            .then(response => response.json())
            .then(async data => {
              if (data.success === false){  
                console.log(data);
                res.render('error', { title: 'Error', message: 'Something Went Wrong', role:role, id:id});
                return "error";
              }
              else 
              {
                console.log('2:', data);
                res.redirect("/myArticles");
              }
            })
            .catch(error => { //Error in the fetch
              console.error(error);
              res.render('error', { title: 'Invalid User', message: 'Invalid username or password', data: error.data, role:role, id:id });
              return "error";
            })
          })
    
module.exports = router;