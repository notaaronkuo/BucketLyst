/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

//sql
const mysql = require('mysql');
const con = mysql.createConnection({
  host     : "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
  user     : "team1",
  password : "921382797",
  port     : 3306,
  multipleStatements: true
});


/**********************
 * Example get method *
 **********************/

app.get('/makelist', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.get('/makelist/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/makelist', function(req, res) {
  // Add your code here
  const params = req.body;
  const title = params['title'];
  const description = params['description'];
  //const tags = params['tags'];
  const userID = params['userID'];



  con.connect( function(err) {
    if (err) throw err;
    con.query("INSERT INTO db2.Lists (title, description, is_public, owner_fk)" + 
    " VALUES ('"+title+"', '"+description+"',1, "+ userID+ "); ",
    function(err, result, fields){
      if (err) {
        console.log("error in first function");
        throw err;
      }
      res.json({success: 'post call succeed!', url: req.url, body: userID});
      con.end();
    });
    
});

  
});

app.post('/makelist/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/makelist', function(req, res) { //edit
  // Add your code here
  const params = req.body;
  const title = params['title'];
  const description = params['description'];
 // const tags = params['tags'];
  const listID = params['listID'];
  const userID = params['userID'];
  let userid = null;

  con.connect( function(err) {
    if (err) throw err;
    con.query("UPDATE INTO db2.Lists SET " + 
    "name = '" + title + "', description = '" + description +  "', owner_fk = " + 
    userID + "WHERE list_id = " + listID+ ";",
    function(err, result, fields){
      if (err) {
        console.log("error in first function");
        throw err;
      }
      res.json({success: 'post call succeed!', url: req.url, body: userid});
      con.end();
    });
 
    
});




  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/makelist/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/makelist', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/makelist/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
