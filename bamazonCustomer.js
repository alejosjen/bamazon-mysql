require("dotenv").config();
var inquirer = require("inquirer");
var keys = require("./keys.js");
var mysql = require("mysql");
const Table = require("cli-table");
let table;

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
//Create cli-table for user to read what's available in the store
function readProducts() {
    var query = "SELECT * FROM products";
    connection.query(query, function (error, response) {
        if (error) throw error;
        //Create table of data
        table = new Table({
            head: ['ID', 'Product', 'Price']
            , colWidths: [5, 35, 8]
        });
        response.forEach(function (data) {
            table.push(
                [data.item_id,
                data.product_name,
                ("$") + data.price
                ]);
        })
        //Display data
        console.log(table.toString());
        //Call function to begin ordering
        promptOrder();
    });
};
//Prompt user to read the display and choose an item to buy
function promptOrder() {
    inquirer.prompt([
        {
            name: "order",
            message:"------------- Welcome to Bamazon ------------- \n" +
                    "To order, type in a number ID from the table and press enter.\n Type in 'exit' to leave the store."
        }
    ]).then(function (answer, error) {
        if (error) throw error;
        //Input item request
        var orderID = answer.order;
        if (orderID === "exit"){
            connection.end();
            return;
        }
        //Input-validation for item request
        if (isNaN(parseInt(orderID))) {
            console.log("---------------------------------------------------\n");
            console.log("Please retry by entering an ID number.\n");
            console.log("---------------------------------------------------\n");
            promptOrder();
            return;
        }
        promptQuantity(orderID);
    })
};

function promptQuantity(orderID) {
    inquirer.prompt([
        {
            name: "amount",
            message: "How many would you like to order? Enter a number and press enter.\n Type in 'exit' to leave the store."
        }
    ]).then(function (answer, error) {
        //Input order amount
        var amountOrdered = answer.amount;
        if (amountOrdered === "exit"){
            connection.end();
            return;
        }
        //Input-validation for order amount
        if (isNaN(parseInt(amountOrdered))) {
            console.log("---------------------------------------------------\n");
            console.log("Please retry by entering a number or amount greater than 0.\n");
            console.log("---------------------------------------------------\n");
            promptOrder();
            return;
        }
        //Select the row of the requested item, check stock availability, and calculate bill if sufficient stock is available
        connection.query("SELECT * FROM products WHERE item_ID=" + orderID, function (error, response) {
            if (error) throw error;
            //Select row of item information from user's order
            for (var j = 0; j < response.length; j++) {
                var itemName = response[j].product_name;
                var department = response[j].department_name;
                var stockAvailable = response[j].stock_quantity;
                var itemPrice = response[j].price;
                var customerBill = itemPrice * amountOrdered;
                //Checking amount ordered versus stock available
                if (amountOrdered <= stockAvailable) {
                    console.log("---------------------------------------------------\n");
                    console.log("Your Receipt:");
                    console.log("\nProduct(s): " + itemName + " from the " + department + " department");
                    console.log("Amount ordered: " + amountOrdered);
                    console.log("Your bill: $" + customerBill);
                    console.log("Your item will be delivered in 5-10 business days.\n");
                    console.log("Contact us for large orders, amount available: " + stockAvailable + "\n");
                    console.log("---------------------------------------------------\n");
                    console.log("Thank you for shopping with Bamazon!\n");
                    console.log("---------------------------------------------------\n");
                    updateDatabase(amountOrdered, orderID);
                } else {
                    console.log("---------------------------------------------------\n");
                    console.log("Insufficient quantity!")
                    console.log("Amount available: " + stockAvailable +"\n");
                    console.log("Please, contact us for large orders.\n");
                    console.log("---------------------------------------------------\n");
                    promptReorder();
                };
            }
        });
        
    })
}
function updateDatabase(amountOrdered, orderID){
    //Update database by subtracting order amount from the stock quantity
        connection.query(
            `UPDATE products 
                 SET stock_quantity = stock_quantity - ${amountOrdered}
                 WHERE item_id = ${orderID}`,
            function (error, response) {
                if (error) throw error;
                console.log("Department use only:");
                console.log("Confirmation: " + response.affectedRows + " stock quantity updated.\n");
                promptReorder();
            });
}

function promptReorder(){
    inquirer.prompt([
        {
            type: "confirm",
            name: "reorder",
            message: "Would you like to order again?"
        }
    ]).then(function (answer, error) {
        if (answer.reorder) {
            promptOrder();
        } else {
            console.log("---------------------------------------------------\n");
            console.log("Thank you for shopping. Come again!\n")
            console.log("---------------------------------------------------\n");
            connection.end();
        }
    })
}