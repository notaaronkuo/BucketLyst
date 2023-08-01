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

const mysql = require('mysql');
const con = mysql.createConnection({
  host: "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
  user: "team1",
  password: "921382797",
  port: 3306,
  multipleStatements: true
});

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

app.get('/viewlist', function (req, res) {
  // Add your code here
  const params = req['query'];
  const listType = params['listType'];
  const userid = params['userid'];

  con.connect(function (err) {
    if (err) {
      console.log('viewlist db connection issue');
    }
    switch (listType) {
      case 'myList':
        con.query(` SELECT l.id as listID, l.title as title, l.description as description,
                    l.is_public as visibility, l.owner_fk as ownerID,
                  (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks,
                  (SELECT Group_concat(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags,
                  (SELECT place_id from db2.Locations AS location WHERE location.list_fk = l.id order by creation_time LIMIT 1 ) AS place_id 
                  from db2.Lists as l
                  where owner_fk = ${userid};`, function (err, result, fields) {
          if (err) {
            console.log("error on second query: my list");

            throw err;
          }
          res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: result });
          con.end();
        });
        break;
      case 'followingList':
        con.query(`SELECT l.id as listID, l.title as title, l.description as description,
                l.is_public as visibility, l.owner_fk as ownerID, p.username as ownerUsername, profile.photo as ownerProfile,
                (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks,
                (SELECT Group_concat(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags,
                (SELECT place_id from db2.Locations AS location WHERE location.list_fk = l.id order by creation_time LIMIT 1 ) AS place_id
                from db2.Lists as l 
                join db2.PersonalUsers as p on l.owner_fk = p.id
                join db2.Followers as f on l.owner_fk = f.followed_fk
                join db2.Profiles as profile on profile.user_fk = followed_fk
                where f.following_fk = ${userid};`, function (err, result, fields) {
          if (err) {
            console.log("error on second query: followingList");
            throw err;
          }
          res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: result });
          con.end();
        });
        break;
      case 'discover':
        con.query(`SELECT l.id as listID, l.title as title, l.description as description,
        l.is_public as visibility, l.owner_fk as ownerID, user.username as ownerUsername, p.photo as ownerProfile,
        (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks, 
        (SELECT Group_concat(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags,
        (SELECT place_id from db2.Locations AS location WHERE location.list_fk = l.id order by creation_time LIMIT 1 ) AS place_id
        from db2.Lists as l 
        join db2.PersonalUsers as user on l.owner_fk = user.id 
        join db2.Profiles as p on user.id = p.id
        where l.is_public = 1 and user.is_public = 1;`, function (err, result, fields) {
          if (err) {
            console.log("error on second query: discover");
            throw err;
          }
          res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: result });
          con.end();
        });
        break;
      case 'saved':
        con.query(`SELECT l.id as listID, l.title as title, l.description as description,
              l.is_public as visibility, l.owner_fk as ownerID, p.username as ownerUsername, profile.photo as ownerProfile,
              (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks,
              (SELECT Group_concat(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags,
              (SELECT place_id from db2.Locations AS location WHERE location.list_fk = l.id order by creation_time LIMIT 1 ) AS place_id
              from db2.Lists as l 
              join db2.SavedLists as s on l.id = s.list_fk
              join db2.PersonalUsers as p on l.owner_fk = p.id
              join db2.Profiles as profile on profile.user_fk = l.owner_fk
              where s.user_fk = ${userid};`, function (err, result, fields) {
          if (err) {
            console.log("error on second query: Saved list");
            throw err;
          }
          res.json({ success: 'get call succeed! 1st pattern', url: req.url, body: result });
          con.end();
        });
        break;
      default:
        con.end();
        res.json({ success: 'no input', url: req.url });
    }

  }


  )


});

app.get('/viewlist/*', function (req, res) {
  // Add your code here
  res.json({ success: 'get call succeed!', url: req.url });
});

/****************************
* Example post method *
****************************/

app.post('/viewlist', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

app.post('/viewlist/*', function (req, res) {
  // Add your code here
  res.json({ success: 'post call succeed!', url: req.url, body: req.body })
});

/****************************
* Example put method *
****************************/

app.put('/viewlist', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

app.put('/viewlist/*', function (req, res) {
  // Add your code here
  res.json({ success: 'put call succeed!', url: req.url, body: req.body })
});

/****************************
* Example delete method *
****************************/

app.delete('/viewlist', function (req, res) {
  // Add your code here
  res.json({ success: 'delete call succeed!', url: req.url });
});

app.delete('/viewlist/*', function (req, res) {
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