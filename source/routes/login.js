var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var webCrypto = require('crypto').webcrypto;

const crypto = require('crypto');
const fetch = require('node-fetch');
const { Console } = require('console');
const auth = require("../middleware/verifytoken");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login', message: '' });
  });

router.post('/', async(req, res, next) => {
  
  const KEY_SIZE_BYTES = 64;  // The API expects a 64 byte key (128 hex digits long):
  const SALT_SIZE_BYTES = 16; // The API expects a 16 byte salt (32 hex digits long):

    // A function that converts an array of bytes into a string of hexadecimal digits
    const convertBufferToHex = (buffer) => {
        return (
            // This next line ensures we're dealing with an actual array
            [...new Uint8Array(buffer)]
            // Convert each 1 byte into 2 hexadecimal digits
            .map((byte) => byte.toString(16).padStart(2, '0'))
            // Concatenate it into one string
            .join('')
        );
    };

    
  
    // A function that converts a string of hexadecimal digits into an array of
    // bytes (you should verify that the string is hex first!)
    const convertHexToBuffer = (hexString) => {
        return Uint8Array.from(
            // Keep in mind that:
            // 1 byte = 8 bits
            // 1 hex digit = 4 bits
            // 1 byte = 2 hex digits
            // So, convert every pair of hexadecimal digits into 1 byte
            hexString.match(/[0-9a-f]{1,2}/gi).map((byte) => parseInt(byte, 16))
        );
    };

    // Turns a password (string) and salt (buffer) into a key and salt (hex strings)
    const deriveKeyFromPassword = async (passwordString, saltBuffer, userName, userID, role, profile) => {
        // We'll use a TextEncoder to convert strings into arrays of bytes:
        const textEncoder = new TextEncoder('utf-8');
  
        // Convert the password string into an array of bytes:
        const passwordBuffer = textEncoder.encode(passwordString);
  
        // Use WebCrypto to generate an array of 16 random bytes if one isn't passed
        saltBuffer =
            saltBuffer ||
            webCrypto.getRandomValues(new Uint8Array(SALT_SIZE_BYTES));
        // Convert our passwordBuffer into something WebCrypto understands:
        const plaintextKey = await webCrypto.subtle.importKey(
            'raw', // We're working with a "raw" array of bytes
            passwordBuffer, // Pass in our (converted) password byte array
            'PBKDF2', // Tell WebCrypto our byte array doesn't contain anything fancy
            false, // We don't want anyone to extract the original password!
            ['deriveBits'] // We're gonna use this method to derive a key (below)
        );
        
        // Run the WebCrypto-compatible password through the PBKDF2 algorithm:
        const pbkdf2Buffer = await webCrypto.subtle.deriveBits(
            {
              // Use PBKDF#2 to "hash" our user's password
              name: 'PBKDF2',
              salt: saltBuffer,
              iterations: 100000,
              hash: 'SHA-256'
            },
            plaintextKey,
            KEY_SIZE_BYTES * 8
        );

        const saltString = convertBufferToHex(saltBuffer);
        const keyString = convertBufferToHex(pbkdf2Buffer);

  const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + userID + '/auth';

  var body={key:keyString};

  fetch(varHttpRequest, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(async data => {
    if (data.success === false){  //Login Failed
        res.render('login', {title:'Login Unsuccessful', message: 'Invalid username or password'});
    }
    else //Login Successful
    {
      var token = jwt.sign({
        id: userID, name:userName, role: role, profile: profile
          }, process.env.BEARER_TOKEN, {
          expiresIn: 86400000
          });
          global.userToken=token; //Store into global  
      if (role=='administrator'){
      res.render('admin', {title:'Admin Login Successful', message: 'Welcome to the admin page', name:userName});
      }
      else{
        res.render('index',{title:'Login successful'});
      }
    }
  })
  .catch(error => { //Error in the fetch, not necessarily not finding a user
    console.error(error);
    res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
    return "error";
  })
    return { keyString, saltString };
  };

    const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users/' + req.body.loginUsername; //Setting uri based on user input
    fetch(varHttpRequest, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(async data => {
        if (data.success === false){  //Username is not even in the system
            res.render('login', {title:'Login Unsuccessful', message: 'Invalid username or password'});
        }
        else //Username is at least in the system
        {
            var userSalt=data.user.salt;
            var userKey=data.user.key;
            var pwTest=req.body.loginPassword;
            var userName=req.body.loginUsername;
            var userID=data.user.user_id;
            var role=data.user.type;
            var email = data.user.email
            var userBuffer=convertHexToBuffer(userSalt);
            const profile = crypto.createHash('md5').update(email).digest("hex");
            await deriveKeyFromPassword(pwTest,userBuffer,userName,userID,role,profile);
        }
      })
      .catch(error => { //Error in the fetch, not necessarily not finding a user
        console.error(error);
        res.render('login', { title: 'Invalid User', message: 'Invalid username or password', data: error.data });
        return "error";
      })
});

  module.exports = router;