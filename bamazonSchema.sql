DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	item_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT DEFAULT 0,
    stock_quantity INT DEFAULT 0
);

INSERT INTO products (product_name, department_store, price, stock_quantity)
VALUES ("Bible", "Books", 25, 1000),
				("Cross", "Home & Kitchen", 20, 1000),
                ("Nativity Set", "Home & Kitchen", 45, 1500),
                ("White Stringed Lights", "Home and Kitchen", 15, 2500),
                ("Christmas tree", "Seasonal Decor", 200, 300),
                ("Christmas tree skirt", "Seasonal Decor", 10, 350),
                ("Hot Chocolate, 50pack", "Grocery", 15, 400);