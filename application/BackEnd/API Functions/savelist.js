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
app.use(function (req, res, next) {
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

    multipleStatements: true
});

/**********************
 * Example get method *
 **********************/

app.get('/temp/savelist/:userid', function (req, res) {
    // Add your code here
    con.connect(function (err) {
        con.query("SELECT * FROM db2.SavedLists WHERE user_fk = " + req.query.userid, function (err, result, fields) {
            if (err) throw err;
            res.json({success: 'get call succeed!', url: req.url, body: result})
        });
    });
});

app.get('/temp/savelist/:userid/*', function (req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
});

/****************************
 * Example post method *
 ****************************/

app.post('/temp/savelist/:userid', function (req, res) {
    // Add your code here
    let userid = req.query["userid"];
    let listid = req.body["listid"];
    con.connect(function (err) {
            con.query("INSERT INTO db2.SavedLists (user_fk, list_fk) VALUES (" + userid + ", " + listid + ")", function (err, result, fields) {
                if (err) throw err;
                res.json({success: 'post call succeed!', url: req.url, body: result, err: err, fields: fields
            });
        });
    });
});

app.post('/temp/savelist/:userid/*', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example put method *
 ****************************/

app.put('/temp/savelist/:userid', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/temp/savelist/:userid/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/temp/savelist/:userid', function (req, res) {
    // Add your code here

    let userid = req.params.userid;
    let listid = req.query.listid;
    con.connect(function (err) {
        con.query("DELETE FROM db2.SavedLists WHERE user_fk = " + userid + " AND list_fk = " + listid + ";", function (err, result, fields) {
            if (err) throw err;
            res.json({success: 'delete call succeed!', url: req.url, body: result, fields: fields, err: err})
        });
    });

});

app.delete('/temp/savelist/:userid/*', function (req, res) {
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
