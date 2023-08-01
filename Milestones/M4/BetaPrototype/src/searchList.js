 const express = require("express");
const mysql = require("mysql2/promise");

const router = express.Router();

router.post("/makeList", async (req, res) => {
  try {
    // Extract form data from the request body
    const { listName, locationName, listDescription } = req.body;

    // Create a connection to the MySQL RDS instance
    const connection = await mysql.createConnection({
        host: 'q.cnzomfczmn9g.us-west-1.rds.amazonaws.com',
        user: 'team1',
        password: '921382797',
        database: 'bucket'
    });

    // Insert the form data into the LocationList table
    const [result] = await connection.execute(
      "INSERT INTO LocationList (LocationListName, ListDescription, IsPublic, CreatedTime, LocationListTags, LocationID, UserID, LocationName) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        listName,
        listDescription,
        1, // Set IsPublic to 1 by default for now
        new Date(), // Use current date and time as CreatedTime
        "", // Leave LocationListTags empty for now
        0, // Set LocationID to 0 by default for now
        0, // Set UserID to 0 by default for now
        locationName,
      ]
    );

    // Close the MySQL connection
    await connection.end();

    // Return a success message to the client
    res.status(200).json({ message: "List created successfully" });
  } catch (error) {
    console.error(error);
    // Return an error message to the client
    res.status(500).json({ message: "Server error" });
  }
});

// Test route for search
router.get("/searchTest", async (req, res) => {
  try {
    // Create a connection to the MySQL RDS instance
    const connection = await mysql.createConnection({
        host: 'q.cnzomfczmn9g.us-west-1.rds.amazonaws.com',
        user: 'team1',
        password: '921382797',
        database: 'bucket'
    });

    // Execute a test search query
    const [result] = await connection.execute(
      "SELECT * FROM Location WHERE LocationName LIKE ?",
      ["%searchterm%"]
    );

    // Close the MySQL connection
    await connection.end();

    // Return the search results to the client
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    // Return an error message to the client
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
