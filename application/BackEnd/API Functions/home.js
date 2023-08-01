/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

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

app.get('/home', function (req, res) {
  // Add your code here
  const params = req['query'];
  const username = params['username'];
  const email = params['email'];
  let userInfo = undefined;

  con.connect(function (err) {
    if (err) {
      console.log("Error has occured at get request home API");
      throw err;
    }
    con.query(`SELECT per.id, per.username, pro.photo from db2.PersonalUsers as per
    join db2.Profiles as pro on per.id = pro.user_fk where per.username = '${username}';`,
      function (err, result, fields) {
        console.log("result is:", result);

        userInfo = result;
        console.log(result);


        if (userInfo[0] === undefined) {
          con.query(`INSERT INTO db2.PersonalUsers (username, email, is_public) VALUES (
            '${username}', '${email}', 0); SELECT LAST_INSERT_ID();`, function (err, result, field) {
              if (err) {
                console.log("error on second query");
                throw err;
              }
              userInfo = result;
              console.log('query2: ' ,userInfo)

              con.query(`INSERT INTO db2.Profiles (name, user_fk, photo) VALUES (
                '${username}', ${userInfo['id']}, 'https://dummyimage.com/100/787878/000000.png&text=USER');`, function () {
                  if (err) {
                    console.log("error on third query");
                    throw err;
                  }
                  res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: {id : userInfo['id'], username: username, photo: 'https://dummyimage.com/100/787878/000000.png&text=USER'} });
                  con.end();
                });
            })
        } else {
          res.json({ success: 'get call succeed!', url: req.url, body: userInfo });
          con.end();

        };
      });
  });
});

app.get('/home/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/home', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/home/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/home', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/home/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/home', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/home/*', function (req, res) {
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
