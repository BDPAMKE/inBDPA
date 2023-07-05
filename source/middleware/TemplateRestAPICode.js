//################################################################
// This code sniplet is for making a Get Rest API call         #
//################################################################
const myGetRestCall = require("../middleware/GetRestAPI"); //to top of Route where you wan tto make the Get All Add:


 // this in your route 
 const url = 'https://blogpress.api.hscc.bdpa.org/v1/info' // This is an Example - where the URL is whatever Get RestAPI Request you are calling
 const token = process.env.BEARER_TOKEN;

 
 //This function will take the two variables and pass them to the Get RestAPI call 
  myGetRestCall.getWithBearerToken(url, token)
.then(data => console.log("REST CALL ", data))
.catch(error => console.error(error));
//################################################################


//################################################################
// This code sniplet is for making a Post Rest API call        #
//################################################################
// this in your route, add all below to the route.  
const myPostRestCall = require('../middleware/PostRestAPI');
const url = 'https://blogpress.api.hscc.bdpa.org/v1/blogs/some-blog/pages';   // This is an Example - where the URL is whatever Post RestAPI Request you are calling
const token = process.env.BEARER_TOKEN;
const data = req.body;  // this is the json body from the EJS post function

 
 //This function will take the two variables and pass them to the Post RestAPI call 
 
myPostRestCall.postWithBearerToken(url, token, data)
  .then(data => console.log(data))
  .catch(error => console.error(error));
//################################################################


//################################################################
// This code sniplet is for making a Patch Rest API call       #
//################################################################
// this in your route, add all below to the route.  
const myPatchRestCall = require('../middleware/PatchRestAPI');
const url = 'https://blogpress.api.hscc.bdpa.org/v1/blogs/nova-hscc';   // This is an Example - where the URL is whatever Patch RestAPI Request you are calling
const token = process.env.BEARER_TOKEN;
const data = req.body;  // this is the json body from the EJS post function

//const data = { "name": "nova-hscc1" } ;  // this is body for this Example you can use it to test

 //This function will take the two variables and pass them to the Patch RestAPI call 
myPatchRestCall.patchWithBearerToken(url, token, data)
  .then(data => console.log(data))
  .catch(error => console.error(error));
//################################################################
 

//################################################################
// This code sniplet is for making a Delete Rest API call      #
//################################################################
const myDeleteRestCall = require("../middleware/DeleteRestAPI"); //to top of Route where you wan tto make the Get All Add:


// this in your route 
const url = 'https://blogpress.api.hscc.bdpa.org/v1/blogs/some-blog/pages/page-1' // This is an Example - where the URL is whatever Delete RestAPI Request you are calling
const token = process.env.BEARER_TOKEN;


//This function will take the two variables and pass them to the Get RestAPI call 
myDeleteRestCall.deleteWithBearerToken(url, token)
.then(data => console.log("REST CALL ", data))
.catch(error => console.error(error));

