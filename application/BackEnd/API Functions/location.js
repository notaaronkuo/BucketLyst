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
    port: 3306,
    multipleStatements: true
});


/**********************
 * Example get method *
 **********************/

app.get('/location', function (req, res) {
    let location_id = req.query.location_id;
    con.connect(function (err) {
        con.query("SELECT * FROM db2.Locations WHERE id = " + location_id, function (err, result, fields) {
            if (err) {
                res.json({error: err});
                return
            }
            res.json({success: 'get call succeed!', url: req.url, body: result})
        });
    });
});

app.get('/location/*', function (req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
});

/****************************
 * Example post method *
 ****************************/

app.post('/location', function (req, res) {
    const {
        location_name,
        location_description,
        latitude,
        longitude,
        list_fk,
        tags,
        place_id,
        rating
    } = req.body;

    con.query(
        "INSERT INTO db2.Locations (name, description, list_fk, tags, place_id, rating, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)",
        [location_name, location_description, list_fk, tags, place_id, rating, latitude, longitude],
        function (err, result, fields) {
            if (err) {
                res.json({error: err, body: req.body});
                return;
            }
            res.json({success: 'post call succeed!', url: req.url, body: result});
        }
    );
});

app.post('/location/*', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example put method *
 ****************************/

app.put('/location', function (req, res) {
    // Add your code here
    const {
        location_id,
        location_name,
        location_description,
        list_fk,
        tags,
        place_id,
        rating,
        latitude,
        longitude
    } = req.body;

    let update_query = "UPDATE db2.Locations SET ";

    if (location_name) {
        update_query += "name = '" + location_name + "', ";
    }
    if (location_description) {
        update_query += "description = '" + location_description + "', ";
    }
    if (list_fk) {
        update_query += "list_fk = '" + list_fk + "', ";
    }
    if (tags) {
        update_query += "tags = '" + tags + "', ";
    }
    if (place_id) {
        update_query += "place_id = '" + place_id + "', ";
    }
    if (rating) {
        update_query += "rating = '" + rating + "', ";
    }
    if (latitude) {
        update_query += "latitude = '" + latitude + "', ";
    }
    if (longitude) {
        update_query += "longitude = '" + longitude + "', ";
    }

    update_query = update_query.slice(0, -2);
    update_query += " WHERE id = " + location_id;

    con.connect(function (err) {
        con.query(update_query, function (err, result, fields) {
            if (err) {
                res.json({error: err, body: req.body, fields: fields, update_query: update_query})
                return;
            }
            res.json({success: 'put call succeed!', url: req.url, body: result, update_query: update_query});
        });
    });

    // res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/location/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/location', function (req, res) {
    // Add your code here
    const request_params = req.body;
    const location_id = request_params["location_id"];
    con.connect(function (err) {
        con.query("DELETE FROM db2.Locations WHERE id = " + location_id, function (err, result, fields) {
            if (err) {
                res.json({error: err, body: request_params});
                return
            }
            res.json({success: 'delete call succeed!', url: req.url, body: result});
        });
    });
});

app.delete('/location/*', function (req, res) {
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
