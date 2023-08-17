const { Console } = require('console');
var express = require('express');
var router = express.Router();
var crypto =require('crypto').webcrypto;
var jwt=require('jsonwebtoken');
const auth = require("../middleware/verifytoken");
const myPatchRestCall = require('../middleware/PatchRestAPI');
const { globalAgent } = require('http');
/* GET home page. */
router.get('/', auth, function(req, res, next) {
  const role=res.locals.role;
  const id=res.locals.id;
  const name=res.locals.name;
  
  res.render('profilepic', { title: 'profilepic', message: '', role:role, id:id, name:name});
  });

 router.post('/profilepic', auth, function(req, res) {
    const role=res.locals.role;
    const id=res.locals.id;
    const name=res.locals.name;
    const file = req.files.upload
    const filePath = path.join(__dirname, 'public', 'images', `${file.name}`)
    
    file.mv(filePath, err => {
    if (err) return res.status(500).send(err)
    res.redirect('/', {role:role, id:id, name:name})
    })
    })
  module.exports = router;