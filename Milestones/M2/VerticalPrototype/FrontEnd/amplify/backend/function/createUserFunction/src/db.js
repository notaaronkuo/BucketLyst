const express = require('express');
const mysql = require('mysql2/promise');


// Define the database configuration
const dbConfig = {
  host: 'bucket.cnzomfczmn9g.us-west-1.rds.amazonaws.com',
  user: 'team1',
  password: '921382797',
  database: 'bucket',
};

// Define a function to connect to the database
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the database successfully!');
    return connection;
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
}


// Define an API endpoints


// Start the server
//app.listen(3306, () => {
  //console.log('Server is listening on port 3300');
//});
