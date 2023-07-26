var express = require('express');
var router = express.Router();
var MarkdownIt = require('markdown-it'),
md = new MarkdownIt();
const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");
const myPostRestCall = require('../middleware/PostRestAPI');
const myPatchRestCall = require('../middleware/PatchRestAPI');
const myDeleteRestCall = require("../middleware/DeleteRestAPI"); 
/* GET resttest page */
router.get('/', function(req, res, next) {
  res.render('resttest', { title:"resttest", results:""});
});

router.post('/', function(req, res, next) {
  console.log("req " , JSON.stringify(req.body))
  if(req.body.method.toUpperCase() == "GET") { 
    
    const url = req.body.url 
    const token = process.env.BEARER_TOKEN;
    myGetRestCall.getWithBearerToken(url, token)
       .then(data=>  { console.log("REST CALL ", data),
                    varData = JSON.stringify(data),
                     res.render('resttest', { title:"resttest get ", results: varData }  )     
       
       
       .catch(error => console.error(error));
   
  
  })
}
 
 
if(req.body.method.toUpperCase() == "POST") { 
      const url = req.body.url 
      const token = process.env.BEARER_TOKEN;
      const data = req.body;
      myPostRestCall.postWithBearerToken(url, token, data)
      /*  .then(data => {console.log(data),
          varData = JSON.stringify(data),
          res.render('resttest', { title:"resttest POST ", results: varData  }   
        )
        .catch(error => console.error(error));
   */
      console.log('function',myPostRestCall())
 }
//}

  if(req.body.method.toUpperCase() == "PATCH") { 
    const url = req.body.url
    const token = process.env.BEARER_TOKEN;
    const data = req.body; 
    myPatchRestCall.patchWithBearerToken(url, token, data)
    console.log("patch F ", JSON.parse(myPatchRestCall.patchWithBearerToken()) ) 
       
  }
 
 
    if(req.body.method.toUpperCase() == "DELETE") { 
      const url = req.body.url
      const token = process.env.BEARER_TOKEN;
      myDeleteRestCall.deleteWithBearerToken(url, token)
      .then(data => {console.log("REST CALL ", data),
       varData = JSON.stringify(data),
       res.render('resttest', { title:"resttest DELETE ", results: varData });     
       
    })
       .catch(error => console.error(error))
      };
    
    



  //res.render('resttest', { title:"resttest None ", results: ""  });
    }
)


module.exports = router;