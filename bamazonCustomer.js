require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var mysql = require("mysql");
// import Table from 'cli-table';

var connection = mysql.createConnection({
    host: keys.mySQL.host,
    port: keys.mySQL.port,
    user: keys.mySQL.username,
    password: keys.mySQL.password,
    database: keys.mySQL.database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    console.log("Available products for sale: ")
    var query = "SELECT item_id,product_name,department_name,price,stock_quantity FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        for (var i = 0; i < response.length; i++) {
            console.log(
                "ID: " +
                response[i].item_id +
                " || Product: " +
                response[i].product_name +
                // " || Department: " +
                // response[i].department_name +
                " || Price: $" +
                response[i].price
                // +
                // " || Stock: " +
                // response[i].stock_quantity
            );
        };
        promptOrderID();
    });
};

function promptOrderID() {
    inquirer.prompt([
        {
            name: "order",
            message: "Please, type in the ID# of your order."
        }
    ]).then(function (itemID, error) {
        var orderID = itemID.order;
        var string = orderID.toString();
        var number = Number.parseFloat(string);
            if (Number.isNaN(number)|| orderID === "" || orderID === false || orderID === null || orderID === undefined) {
                console.log("Please retry by entering an ID number.");
                promptOrderID();
            } else {
                var customerOrder = orderID;
                promptHowMany();
            }
    })
}

function promptHowMany() {
    inquirer.prompt([
        {
            name: "amount",
            message: "How many would you like to order?"
        }
    ]).then(function (answer, error) {
        if (answer.amount === "" || answer.amount === NaN || answer.amount === false || answer.amount === null) {
            console.log("Please retry by entering a number.");
            promptHowMany();
        } else {
            var amountOrdered = answer.amount;
        }
    }); connection.end();
};