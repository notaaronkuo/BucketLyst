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

app.get('/follow', function (req, res) {
  // Add your code here
  const params = req['query'];
  const viewerID = params['viewerID'];
  const receiverID = params['receiverID'];

  con.query(`SELECT COUNT(*) as count from db2.Followers WHERE (following_fk =  ${viewerID}) AND (followed_fk = ${receiverID});`, 
      function (err, result, field) {
      if (err) {
        console.log("error on follow GET query 1");
      }
      let status = (result[0]['count'] > 0) ? 'Following' : 'Follow';
      if (status === 'follow') {
        con.query("SELECT COUNT(*) as count from db2.Requests WHERE (sender_fk = " + viewerID
          + ") AND (receiver_fk = " + receiverID + ") AND is_accepted = 0);", function (err, result, field) {
            if (err) {
              console.log("error on second query");
              throw err;
            }
            status = (result[0]['count'] > 0) ? 'Requested' : 'Follow';
            res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: status });
            con.end();
          })
      } else {
        res.json({ success: 'get call succeed!', url: req.url, body: status });
        con.end();
      
    };
  });
});


app.get('/follow/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/follow', function (req, res) {
  // Add your code here
  const params = req.body;
  const senderID = params['senderID'];
  const receiverID = params['receiverID'];

  con.connect(function (err) {
    if (err) {
      console.log("error on follow API connecting db");
      throw err;
    }
    con.query(`SELECT is_public FROM db2.PersonalUsers where id = ${receiverID};`, function(err, result) {
      let public = (result[0]['is_public'] === 1);
      
      if (public) {
        con.query(`INSERT INTO db2.Followers (followed_fk, following_fk) 
          VALUES (  ${receiverID} , ${senderID});`, function (err, result, fields) {
            if (err) {
              console.log("error in public account api");
              throw err;
            }
            res.json({ success: 'API: follow post call succeed!', url: req.url, body: 'following now!' });
            con.end();
          });
      } else {
        con.query(`INSERT INTO db2.Requests (receiver_fk, sender_fk, is_accepted, is_read) 
          VALUES ( ${receiverID}, ${senderID}, 0, 0 );`, function (err, result, fields) {
            if (err) {
              console.log("error in public account api");
              throw err;
            }
            res.json({ success: 'API: follow post call succeed!', url: req.url, body: 'follow request sent!' });
            con.end();
          });
      }

    })
  });
});

app.post('/follow/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/follow', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/follow/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/follow', function (req, res) {
  // Add your code hereconst params = req['query'];
  const params = req.body;
  const viewerID = params['viewerID'];
  const receiverID = params['receiverID'];
  
  con.query(`DELETE FROM db2.Followers WHERE (following_fk = ${viewerID}) AND (followed_fk = ${receiverID});`, function (err, result, field) {
      if (err) {
        console.log("error on follow DELETE query 1");
      }


      console.log("result: ", result);
      res.json({ success: 'follow delete call succeed!', url: req.url , body: result});
      con.end();
    })
});

app.delete('/follow/*', function (req, res) {
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