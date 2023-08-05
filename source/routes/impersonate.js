const { Console } = require('console');
var express = require('express');
var router = express.Router();
var crypto =require('crypto').webcrypto;
var jwt=require('jsonwebtoken');
const auth = require("../middleware/verifytoken");
const myPatchRestCall = require('../middleware/PatchRestAPI');
const { globalAgent } = require('http');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('imperonate', { title: 'Impersonate', message: '' });
  });

router.post('/', auth, async(req, res, next) =>{
const role=res.locals.role;
const username=res.locals.result;
const userID=res.locals.id;
global.userID = userID;
global.role = role;
res.redirect('/profile/'+USERNAME);  //USERNAME -> Value typed in for the impersonate field

});
module.exports = router;
