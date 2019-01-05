require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var mysql = require("mysql");
const Table = require('cli-table');

// var connection = mysql.createConnection({
//     host: keys.mySQL.host,
//     port: keys.mySQL.port,
//     user: keys.mySQL.username,
//     password: keys.mySQL.password,
//     database: keys.mySQL.database
// });

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    readProducts();

    function readProducts() {
        var query = "SELECT * FROM products";
        connection.query(query, function (error, response) {
            if (error) throw error;
            //Create table of data
            const table = new Table({
                head: ['ID', 'Product', 'Price']
                , colWidths: [5, 35, 8]
            });
            for (var i = 0; i < response.length; i++) {
                var itemUniqueID = response[i].item_id;
                var productName = response[i].product_name;
                var department = response[i].department_name;
                var price = response[i].price;
                var stockQuantity = response[i].stock_quantity;
                table.push(
                    [itemUniqueID,
                        productName,
                        ("$") + price
                    ]);
            };
            //Display data
            console.log(table.toString());
            //Call function to begin ordering
            promptOrder();
        });
    };
    function promptOrder() {
        inquirer.prompt([
            {
                name: "order",
                message: "Please, type in the ID# of your order."
            },
            {
                name: "amount",
                message: "How many would you like to order?"
            }
        ]).then(function (answer, error) {
            if (error) throw error;

            //Input item request
            var orderID = answer.order;
            var string = orderID.toString();
            var number = Number.parseFloat(string);

            //Input-validation for item request
            if (Number.isNaN(number) || orderID === "" || orderID === false || orderID === null || orderID === undefined) {
                console.log("Please retry by entering an ID number.");
                promptOrder();
            }

            //Input order amount
            var amountOrdered = answer.amount;
            var stringIt = amountOrdered.toString();
            var isNumber = Number.parseFloat(stringIt);

            //Input-validation for order amount
            if (Number.isNaN(isNumber) || amountOrdered === 0 || amountOrdered === "" || amountOrdered === false || amountOrdered === null || amountOrdered === undefined) {
                console.log("Please retry by entering a number or amount greater than 0.");
                promptOrder();
            }

            function checkStock() {
                var query = "SELECT * FROM products WHERE item_ID=" + orderID;
                connection.query(query, function (error, response) {
                    if (error) throw error;
                    // var stock = response;
                    for (var j = 0; j < response.length; j++) {
                        var customerSelection = response[j].item_id;
                        var customerProductName = response[j].product_name;
                        var customerDepartment = response[j].department_name;
                        var customerPrice = response[j].price;
                        var customerStockAvailable = response[j].stock_quantity;

                        if (amountOrdered <= customerStockAvailable) {
                            console.log("Your requested amount: " + amountOrdered);
                            console.log("In Stock");
                        } else {
                            console.log("Insufficient quantity!")
                            console.log("Amount available: " + customerStockAvailable);
                        };
                    }
                })
            };
            checkStock();
            connection.end();
        })
    };
});