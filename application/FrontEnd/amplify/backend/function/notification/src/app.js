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

app.get('/notification', function (req, res) {
    let user_fk = req.query.userid;
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * from db2.Notifications where user_fk = " + user_fk + ";", function (err, result, fields) {
            res.json({
                success: 'get call succeed!', url: req.url, result: result, err: err, fields: fields
            });
        });
    });
});

app.get('/notification/*', function (req, res) {
    // Add your code here
    res.json({success: 'get call succeed!', url: req.url});
});

/****************************
 * Example post method *
 ****************************/

app.post('/notification', function (req, res) {
    // There can be multiple notification types
    // notification_type can be one of the following:
    // follow(request and not needed), created a new list, edited a list
    let notification_type = req.body.notification_type;
    let receiver_id = req.body.receiver_id;
    let sender_id = req.body.sender_id;
    let list_id = req.body.list_id;
    let message = "";

    if (!['follow', 'new_list', 'edit_list'].includes(notification_type)) {
        res.json({error: 'Invalid notification type', url: req.url, body: req.body});
        return;
    }
    // if following, need to discern between request and no request
    let check_public_query = "";
    if (notification_type === 'follow') {
        // get if the receiver is public or not
        con.connect(function (err) {
            check_public_query = "SELECT is_public from db2.PersonalUsers where id = " + receiver_id + ";";
            let receiver_is_public;
            con.query(check_public_query, function (err, result, fields) {
                if (err) {
                    res.json({error: 'Error getting receiver is_public', url: req.url, body: req.body});
                    return;
                }
                if (result[0].is_public === 1) {
                    receiver_is_public = true;
                } else if (result[0].is_public === 0) {
                    receiver_is_public = false;
                }
                // Get the name of sender for the message
                let get_sender_name_query = "SELECT username from db2.PersonalUsers where id = " + sender_id + ";";
                let sender_name;
                con.query(get_sender_name_query, function (err, result, fields) {
                    sender_name = result[0].username;
                    if (err) {
                        res.json({error: 'Error getting receiver and sender names', url: req.url, body: req.body});
                        return;
                    }

                    if (receiver_is_public) {
                        message = sender_name + " has followed you!";
                    } else if (!receiver_is_public) {
                        message = sender_name + " has requested to follow you!";
                    }
                    // query to insert into notifications table
                    let insert_notification_query = "INSERT INTO db2.Notifications (sender_fk, receiver_fk, content, is_read) VALUES (" + sender_id + ", " + receiver_id + ", '" + message + "', 0);";
                    con.query(insert_notification_query, function (err, result, fields) {
                        if (err) {
                            res.json({error: 'Error inserting into notifications table', url: req.url, body: req.body});
                            return;
                        }
                        res.json({success: 'post call succeed!', url: req.url, body: req.body});

                    });
                });
            });
        });
    }
        // new list and edit list are the same, but different messages
        // a list id is needed to retrieve the name of the list
        // also we'll need to notify all the followers of the sender
        // that is, all the following_fk on Followers table with sender_id as followed_fk
    // first we need to query for the name of the list and the sender name

    else if (notification_type === 'new_list' || notification_type === 'edit_list') {
        con.connect(function (err) {
            // first we need to query for the name of the list and the sender name
            let get_list_title_query = "SELECT title from db2.Lists where id = " + list_id + ";";
            let get_sender_name_query = "SELECT username from db2.PersonalUsers where id = " + sender_id + ";";
            let list_title;
            let sender_name;
            con.query(get_list_title_query + get_sender_name_query, function (err, result, fields) {
                list_title = result[0][0].title;
                sender_name = result[1][0].username;
                if (err) {
                    res.json({
                        error: 'Error getting list title and sender name, for list notifications',
                        url: req.url,
                        body: req.body
                    });
                    return;
                }
                // create messages for new list and edit list
                if (notification_type === 'new_list') message = sender_name + ' has created a new list: ' + list_title;
                else if (notification_type === 'edit_list') message = sender_name + ' has edited a list: ' + list_title;
                // now we need to add notifications for each following_fk of followed_fk = sender_id
                let notify_all_followers_query = "INSERT INTO db2.Notifications (sender_fk, receiver_fk, content, is_read) SELECT ?, db2.Followers.following_fk, ?, 0 FROM db2.Followers WHERE Followers.followed_fk = ?";
                con.query(notify_all_followers_query, [sender_id, message, sender_id], function (err, result, fields) {
                    if (err) {
                        res.json({
                            error: 'Error inserting into notifications table',
                            url: req.url,
                            body: req.body
                        });
                        return;
                    }
                    res.json({success: 'post call succeed!', url: req.url, body: req.body});

                });
            });
        });
    }

    // If more notification types are added, add them here
    else {
        res.json({error: 'Invalid notification type', url: req.url, body: req.body});

    }
});


app.post('/notification/*', function (req, res) {
    // Add your code here
    res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example put method *
 ****************************/

app.put('/notification', function (req, res) {
    // Add your code here
    // change is_read to 1 or 0
    if (req.body.notification_id) {
        if (req.body.is_read) {
            if (req.body.is_read === 1 || req.body.is_read === 0) {
                con.query("UPDATE db2.Notifications SET is_read = " + req.body.is_read + " WHERE id = " + req.body.notification_id + ";", function (err, result, fields) {
                    res.json({success: 'put call succeed!', url: req.url, result: result, err: err, fields: fields});

                });
            }
        }
    } else {
        res.json({error: 'Missing notification_id or is_read', url: req.url, body: req.body});

    }
});

app.put('/notification/*', function (req, res) {
    // Add your code here
    res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/notification', function (req, res) {
    con.connect(function (err) {

        con.query("DELETE FROM db2.Notifications WHERE  id = " + req.query.notification_id + ";", function (err, result, fields) {
            res.json({success: 'delete call succeed!', url: req.url, result: result, err: err, fields: fields});
            if (err) {
                res.json({error: "Delete failed"});
            }
        });
    });
});

app.delete('/notification/*', function (req, res) {
    con.query("DELETE FROM db2.Notifications WHERE  id = " + req.query.notification_id + ";", function (err, result, fields) {
        res.json({success: 'delete call succeed!', url: req.url, result: result, err: err, fields: fields});
        if (err) {
            res.json({error: "Delete failed"});
        }
    });
});

app.listen(3000, function () {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app