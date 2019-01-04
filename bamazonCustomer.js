require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: keys.mySQL.host,
  port: keys.mySQL.port,
  user: keys.mySQL.username,
  password: keys.mySQL.password,
  database: keys.mySQL.database
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
    connection.end();
  });