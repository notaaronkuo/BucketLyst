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
const mysql = require('mysql');

  const con = mysql.createConnection({
    host     : "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
    user     : "team1",
    password : "921382797",
    port     : 3306,
    multipleStatements: true
  });

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


/**********************
 * Example get method *
 **********************/

app.get('/followerList', function(req, res) {
  // Add your code here
  const params = req['query'];
  const userID = params['userID'];
  const followingTheUser = params['followingTheUser'];
  
  con.connect(function (err) {
    if (err) {
      console.log('error on connecting db at followerlist');
    }

    if (followingTheUser) { // return list of people who follow this user
      con.query(`SELECT p.username as username , f.following_fk as userid, pro.photo as photo 
       from db2.Followers as f join db2.PersonalUsers as p on p.id = f.following_fk  
      join db2.Profiles as pro on f.following_fk = pro.user_fk WHERE f.followed_fk = ${userID} ;`,
      function(err, result, fields){
        if (err) {
          console.log("error in first function");
          throw err;
        }
        res.json({success: 'get call succeed!', url: req.url, body: result});
        con.end();
      });
    } else { // people this user follows
      con.query(`SELECT p.username as username , f.followed_fk as userid, pro.photo as photo
      from db2.Followers as f join db2.PersonalUsers as p on p.id = f.followed_fk 
      join db2.Profiles as pro on f.followed_fk = pro.user_fk where f.following_fk =  ${userID} ;`,
      function(err, result, fields){
        if (err) {
          console.log("error in first function");
          throw err;
        }
        res.json({success: ' follow list get call succeed!', url: req.url, body: result});
        con.end();
      });
    }

  });
  

  
});

app.get('/followerList/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/followerList', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/followerList/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/followerList', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/followerList/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/followerList', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/followerList/*', function(req, res) {
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