var express = require('express');
var router = express.Router();
const crypto = require('crypto');

const auth = require("../middleware/verifytoken");
const myGetRestCall = require("../middleware/GetRestAPI");

/* GET users listing. */

router.get('/', auth, function(req, res, next) {
const role=res.locals.role;
const id=res.locals.id;
const name=res.locals.name;

//############# Start  increment Views Count #####################   
 const data = '{"views":"increment"}'; 
 const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/'+ global.userID 
 var body=data;
fetch(url, {
method: 'PATCH',
headers: {
 'Authorization': 'Bearer ' +process.env.BEARER_TOKEN,
 'Content-Type': 'application/json'
},
body: data
})
console.log ("user", global.userID)
 res.render('connectcount',{title:'Get Connection Count', userid:global.userID, role:role, id:id, name:name});
});


router.post('/', auth, function (req, res, next) {
    const role=res.locals.role;
    const id=res.locals.id;
    const name=res.locals.name;
    const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + req.body.username; //- where the URL is whatever Get RestAPI Request  you are calling
    const token = process.env.BEARER_TOKEN;
    console.log("body", req.body.username)
    //This function will take the two variables and pass them to the Get RestAPI call 
    myGetRestCall(url, token)
        .then(data => {
            //console.log('data',data);
            //console.log('datasuccess', data.success);
            var userid = data.user.user_id;
            const url = 'https://inbdpa.api.hscc.bdpa.org/v2/users/' + userid + '/connections'; //- where the URL is whatever Get RestAPI Request  you are calling
            const token = process.env.BEARER_TOKEN;
            //This function will take the two variables and pass them to the Get RestAPI call 
            myGetRestCall(url, token)
                .then(data => {
                    console.log('data', data);
                    var connectioncount = data.connections.length
                    res.render('connectcount', { title: 'Connect count page', userid: data.connections + "\nTotal connections: " + connectioncount, role:role, id:id, name:name })
                })
                .catch(error => console.error(error));

            //res.render('connectcount', { title: 'Connect count page', userid:data.user.user_id})
        })
        .catch(error => console.error(error));
});

module.exports = router;
