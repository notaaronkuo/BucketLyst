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

app.get('/search/:SearchTerm/:SearchQuery', function (req, res) {
    let searchTerm = req.params.SearchTerm;
    let searchQuery = req.params.SearchQuery;

    const mysql = require('mysql');
    let resultFromDB = null;
    const con = mysql.createConnection({
        host: "bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com",
        user: "team1",
        password: "921382797",
        port: 3306
    });
    let db_query = ""

    if (searchTerm == 'lists') {
        if (searchQuery === 'all') {
            db_query = "SELECT l.id AS listID, l.title AS title, l.description AS description,\n" +
                "       l.is_public AS visibility, l.owner_fk AS ownerID, p.username AS ownerUsername, profile.photo AS ownerProfile,\n" +
                "       (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks,\n" +
                "       (SELECT GROUP_CONCAT(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags,\n" +
                "       (SELECT place_id FROM db2.Locations AS location WHERE location.list_fk = l.id ORDER BY creation_time LIMIT 1) AS place_id\n" +
                "FROM db2.Lists AS l\n" +
                "         LEFT JOIN db2.SavedLists AS s ON l.id = s.list_fk\n" +
                "         JOIN db2.PersonalUsers AS p ON l.owner_fk = p.id\n" +
                "         JOIN db2.Profiles AS profile ON profile.user_fk = l.owner_fk;"

        } else {
            db_query = "SELECT l.id AS listID, l.title AS title, l.description AS description, l.is_public AS visibility, l.owner_fk AS ownerID, p.username AS ownerUsername, profile.photo AS ownerProfile, (SELECT COUNT(*) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS bookmarks, (SELECT GROUP_CONCAT(tags) FROM db2.Locations AS location WHERE location.list_fk = l.id) AS tags, (SELECT place_id FROM db2.Locations AS location WHERE location.list_fk = l.id ORDER BY creation_time LIMIT 1) AS place_id FROM db2.Lists AS l LEFT JOIN db2.SavedLists AS s ON l.id = s.list_fk JOIN db2.PersonalUsers AS p ON l.owner_fk = p.id JOIN db2.Profiles AS profile ON profile.user_fk = l.owner_fk WHERE l.title LIKE '%" + searchQuery + "%'";
        }
    } else if (searchTerm == 'users') {
        if (searchQuery === 'all') {
            db_query = "SELECT * FROM db2.Profiles"
        } else {
            db_query = "SELECT * FROM db2.Profiles WHERE name LIKE '%" + searchQuery + "%'";
        }
    }
    con.connect(function (err) {
        if (err) throw err;
        con.query(db_query, function (err, result, fields) {
            console.log(result);
            res.json({
                success: 'get call succeed!',
                url: req.url,
                result,
                searchTerm: searchTerm,
                searchQuery: searchQuery
            })
        });
        con.end();
    });
});

/****************************
 * Example post method *
 ****************************/

app.post('/search/:SearchTerm/:SearchQuery', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/search/:SearchTerm/:SearchQuery/*', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example put method *
 ****************************/

app.put('/search/:SearchTerm/:SearchQuery', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/search/:SearchTerm/:SearchQuery/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/search/:SearchTerm/:SearchQuery', function (req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/search/:SearchTerm/:SearchQuery/*', function (req, res) {
    // Add your code here
    res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
