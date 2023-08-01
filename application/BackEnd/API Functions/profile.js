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

app.get('/profiles/:userids', function (req, res) {
   let user_id = req.query.user_id;
    con.connect(function(err) {
        con.query("SELECT * FROM db2.Profiles WHERE id = " + user_id, function (err, result, fields) {
            if (err) {
                res.json({error: err});
                return;
            }
            res.json({success: 'get call succeed!', url: req.url, body: result})
        });
   });
});


app.get('/profiles/:userids/*', function (req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
});

/****************************
 * Example post method *
 ****************************/

app.post('/profiles/:userids', function (req, res) {
    const {
        user_id,
        user_name,
        user_description,
        user_fk,
        photo
    } = req.body;
    con.query(
        "INSERT INTO db2.Profiles (id, name, description, user_fk, photo) VALUES (?,?,?,?,?)",
        [user_id, user_name, user_description, user_fk, photo],
        function (err, result, fields) {
            if (err) {
                res.json({
                    error: err,
                    body: req.body
                });
            }
        }
    )

    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/profiles/:userids/*', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example put method *
 ****************************/

app.put('/profiles/:userids', function (req, res) {
    const {
        user_id,
        user_name,
        user_description,
        user_fk,
        photo
    } = req.body;
    let update_query = "UPDATE db2.Profiles SET";
    if (user_id) {
        update_query += " user_id = '" + user_id + "',";

    }
    if (user_name) {
        update_query += " user_name = '" + user_name + "',";
    }
    if (user_description) {
        update_query += " user_description = '" + user_description + "',";
    }
    if (user_fk) {
        update_query += " user_fk = '" + user_fk + "',";
    }
    if (photo) {
        update_query += " photo = '" + photo + "',";
    }

    update_query = update_query.slice(0, -2);
    con.connect(function (err) {
        if (err) throw err;
        con.query(update_query, function (err, result, fields) {
            if (err) {
                res.json({
                    error: err,
                    body: req.body,
                    fields: fields,
                    update_query: update_query
                });
            }
        });
    });
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/profiles/:userids/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/profiles/:userids', function (req, res) {
    const request_params = req.body;
    const user_id = request_params["user_id"];
    con.query("DELETE FROM db2.Profiles WHERE id= " + user_id, function (err, result, fields) {
        if (err) {
            res.json({
                error: err,
                body: request_params
            });
        }
    });
    res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/profiles/:userids/*', function (req, res) {
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
