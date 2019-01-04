require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: keys.mySQL.username,

  // Your password
  password: keys.mySQL.password,
  database: keys.mySQL.database
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    // createProduct();
  });