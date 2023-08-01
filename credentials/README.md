# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. SSH URL: https://325642715139.signin.aws.amazon.com/console
2. SSH username: Professor
3. SSH passward: Csc648Team01!
4. Database URL: bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com
5. Database username: team1
6. Database password: 921382797
7. Database name: bucket
8. Steps to access team server and databese below:
  * To access Team 1 AWS server and amplify, follow the following steps:
    1) Access through SSH URL above. Account ID should be already filled out when you open the page.
    2) Put above SSH username “Professor” to IAM user name 
    3) Put above SSH passward in passward section and sign in
    4) Select aws amplify app in the aws management console

  * To access Team 1 database MySQL Workbench without SSH, follow the following steps:
    1) Open MyWhat SQL Workbench and click on the "New Connection “or “ +” button.
    2) In the "Connection Name" field, enter a name for your connection: you can put anything as you like, mydb
    3) In the "Connection Method" dropdown, select "Standard (TCP/IP)".
    4) In the "Hostname" field, enter the endpoint for your MySQL database instance: copy and paste this URL in the field from above: bucketlystdb.cnzomfczmn9g.us-west-1.rds.amazonaws.com
    5) In the "Port" field, enter the port number for your MySQL database instance. The default port number for MySQL is 3306. Leave default port.
    6) In the "Username" field, enter the username for the database user you created earlier. Our username is : team1 (no capital)
    7) In the "Password" field, enter the password for the database user you created earlier. Password is: 921382797
    8) Click "Test Connection" to test your connection.
    9) The connection success screen pops up and now you have access


# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
