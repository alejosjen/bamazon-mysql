# bamazon-mysql

This is a node application utilizing MySQL. It's an Amazon-like storefront that takes orders from customers that then updates the store's stock database by subtracting their amounts. It has a friendly user interface that allows the customer to exit the program before and after a transaction. After a transaction the program gives a receipt with the order and the total purchased, as well as giving the customer the option to reorder or exit the application.

To Use:
You will need to have node modules installed: inquirer, cli-table, and mysql. MySQL Workbench is used as the database in this application.

As a customer:
Type in node bamazonCustomer.js to begin the application. It will give you a notice if the connection is made.
A table listing will appear with available products in the store. Each product has an ID, a title and a price.
