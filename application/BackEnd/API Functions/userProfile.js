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

// Enabling SQL connection
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
  user: "team1",
  password: "921382797",
  port: 3306,
  multipleStatements: true
});


/**********************
 * Example get method *
 **********************/

app.get('/userProfile', function(req, res) {
  // userid from frontend
  const params = req['query'];
  const userid = params['userid'];
  
  con.connect(function (err) {
    if (err) {
      console.log('userProfile Get request db connection err');
      throw err;
    }
    con.query(`SELECT user.id as id, p.name as name, p.description as description, p.photo as pfp,
    user.is_public as is_public, 
    (SELECT COUNT(*) FROM db2.Followers as f WHERE f.following_fk = 1) AS following,
    (SELECT COUNT(*) FROM db2.Followers as f WHERE f.followed_fk = 1) as followers,
    (SELECT COUNT(*) FROM db2.Lists as l WHERE l.owner_fk = 1) as listamount
    FROM db2.PersonalUsers AS user 
    JOIN db2.Profiles AS p on user.id = p.user_fk
    WHERE user.id = ${userid};`, 
    function (err, result, fields) {
      res.json({success: 'get call succeed!', url: req.url, body: result});
      con.end();
    });
  });
  

});

app.get('/userProfile/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

/****************************
* Example post method *
****************************/

app.post('/userProfile', function(req, res) {
  // Add your code here
  const params = req.body;
  const userid = params['userid'];
  const name = params['name'];
  const description = params['description'];
  const photo = params['photo'];
  con.connect( function(err) {
    if (err) {
      console.log('error on userProfile post db connection issue');
      throw err;
    }
    con.query(`UPDATE db2.Profiles SET name = '${name}', 
    description = '${description}', photo = '${photo}' WHERE user_fk = ${userid}`,
    function(err, result, fields) {
      res.json({success: 'userProfile edit succeed!', url: req.url, body: req.body});
      con.end();
    });
  });
});

app.post('/userProfile/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
* Example put method *
****************************/

app.put('/userProfile', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/userProfile/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
* Example delete method *
****************************/

app.delete('/userProfile', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/userProfile/*', function(req, res) {
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
