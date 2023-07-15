var express = require('express');
var router = express.Router();
var crypto = require('crypto').webcrypto;

const httpRequest = require('https');
const fetch = require('node-fetch'); //We may need to npm install this...

require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', async(req, res, next) => {

  const KEY_SIZE_BYTES = 64; // The API expects a 64 byte key (128 hex digits long):
  const SALT_SIZE_BYTES = 16; // The API expects a 16 byte salt (32 hex digits long):

// A function that converts an array of bytes into a string of hexadecimal digits
const convertBufferToHex = (buffer) => {
  return (
    // This next line ensures we're dealing with an actual array
    [...new Uint8Array(buffer)]
      // Convert each 1 byte into 2 hexadecimal digits
      .map((byte) => byte.toString(16).padStart(2, '0'))
      // Concatenate it all together into one big string
      .join('')
  );
};

// Turns a password (string) and salt (buffer) into a key and salt (hex strings)
const deriveKeyFromPassword = async (passwordString, saltBuffer) => {
    // We'll use a TextEncoder to convert strings into arrays of bytes:
    const textEncoder = new TextEncoder('utf-8');
 
    // Convert the password string into an array of bytes:
    const passwordBuffer = textEncoder.encode(passwordString);
 
    // Use WebCrypto to generate an array of 16 random bytes if one isn't passed
    // in:
    saltBuffer =
      saltBuffer ||
      crypto.getRandomValues(new Uint8Array(SALT_SIZE_BYTES));
 
    console.log("SaltBuffer:",saltBuffer);
    // Convert our passwordBuffer into something WebCrypto understands:
    const plaintextKey = await crypto.subtle.importKey(
      'raw', // We're working with a "raw" array of bytes
      passwordBuffer, // Pass in our (converted) password byte array
      'PBKDF2', // Tell WebCrypto our byte array doesn't contain anything fancy
      false, // We don't want anyone to extract the original password!
      ['deriveBits'] // We're gonna use this method to derive a key (below)
    );
 
    // Run the WebCrypto-compatible password through the PBKDF2 algorithm:
    const pbkdf2Buffer = await crypto.subtle.deriveBits(
      {
        // We want to use PBKDF#2 to "hash" our user's password
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
 
    console.log("Salt=",saltString);
    console.log("Key=",keyString);

    return { keyString, saltString };
};

  // Return the key and salt as hexadecimal strings
  const { keyString, saltString } = await deriveKeyFromPassword(req.body.registerPassword);

  const newUser = {};
    newUser.username=req.body.registerUsername;
    newUser.email=req.body.registerEmail;
    newUser.salt=saltString;
    newUser.key=keyString;
    newUser.type="inner";
  
  var newUserBody = JSON.stringify(newUser);

  console.log("Body", newUserBody);

  const varHttpRequest = 'https://inbdpa.api.hscc.bdpa.org/v1/users';
    fetch(varHttpRequest, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + process.env.BEARER_TOKEN,
        'Content-Type': 'application/json'
      },
      body: newUserBody
    })
    .then(response => response.json())
    .then(data => {
      console.log("Message & Data ", data);
      console.log("is it successful???", data.success);
      if (data.success == true){
        res.render('register', { title: 'User Add Successful', message: data.message, data: data.data });
      }
      else{
        res.render('register', { title: 'User Add Error', message: "something is wrong????" });
      }
    })
    .catch(error => {
      console.error(error);
      console.log(newUserBody);
      res.render('register', { title: 'User Add Error', message: error.message, data: error.data });
      return "error";
    })
    
});

module.exports = router;