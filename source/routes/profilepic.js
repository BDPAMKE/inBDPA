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
    res.render('profilepic', { title: 'profilepic', message: '' });
  });

 router.post('/profilepic', function(req, res) {
    const file = req.files.upload
    const filePath = path.join(__dirname, 'public', 'images', `${file.name}`)
    
    file.mv(filePath, err => {
    if (err) return res.status(500).send(err)
    res.redirect('/')
    })
    })
  module.exports = router;