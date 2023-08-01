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
  host: "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
  user: "team1",
  password: "921382797",
  port: 3306,
  multipleStatements: true
});

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


/**********************
 * Example get method *
 **********************/

app.get('/request', function (req, res) {
  // Add your code here
  const params = req['query'];
  const userID = params['userID'];
  //const receiverID = params['receiverID'];
  con.connect(function (err) {
    if (err) {
      console.log('err on /request GET connecting db');
    }
    con.query(`SELECT r.sender_fk as senderID, p.username as senderUsername, r.is_read as is_read, 
  r.is_accepted as is_accepted, profile.photo as photo
  FROM db2.Requests as r 
  join db2.PersonalUsers as p on r.sender_fk = p.id
  join db2.Profiles as profile on r.sender_fk = profile.user_fk
  where r.receiver_fk = ${userID};)`, function (err, result, fields) {
      if (err) {
        console.log('err on /request GET query1');
      }
      res.json({ success: 'get call succeed!', url: req.url, body: result });
      con.end();
    })
  });
});

app.get('/request/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/request', function (req, res) {
  // Add your code here
  const params = req.body;
  const senderID = params['senderID'];
  const receiverID = params['receiverID'];
  const is_accepted = params['is_accepted'];
  con.connect(function (err) {
    if (err) {
      console.log('err on /request POST query1')
    }
    if (is_accepted) {
      con.query(`INSERT INTO db2.Followers (following_fk, followed_fk) VALUES
      (${senderID}, ${receiverID}); DELETE FROM db2.Requests WHERE (sender_fk = ${senderID}) AND (receiver_fk = ${receiverID});`, function (err, result, fields) {
        res.json({ success: 'post call request succeed!', url: req.url, body: result });
        con.end();
      });
    } else {
      con.query(`DELETE FROM db2.Requests WHERE (sender_fk = ${senderID}) AND (receiver_fk = ${receiverID});`, 
      function (err, result, fields) {
        res.json({ success: 'post call succeed!', url: req.url, body: result });
        con.end();
      });
    }


  })

  
});

app.post('/request/*', function (req, res) {
  // Add your code here
  

  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/request', function (req, res) {
  // Add your code here
  const params = req.body;
  const senderID = params['senderID'];
  const receiverID = params['receiverID'];
  con.connect(function (err) {
    if (err) {
      console.log('err on /request PUT db connection')
    }
    con.query(`UPDATE db2.Requests SET is_read = 1 WHERE (sender_fk = ${senderID}) AND (receiver_fk = ${receiverID});`, function (err, result, fields) {
      res.json({ success: 'PUT call request succeed! set is_read to true', url: req.url, body: result });
      con.end();
    })
  });
});

app.put('/request/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/request', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/request/*', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app