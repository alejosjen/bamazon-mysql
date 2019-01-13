# [bamazon-mysql](https://alejosjen.github.io/bamazon-mysql/)

This is a node application utilizing MySQL. It's an Amazon-like storefront that takes orders from customers that then updates the store's stock database by subtracting their amounts. It has a friendly user interface that allows the customer to exit the program before and after a transaction. After a transaction the program gives a receipt with the order and the total purchased, as well as giving the customer the option to reorder or exit the application.

* To Use:
  - You will need to have node modules installed: inquirer, cli-table, and mysql. MySQL Workbench is used as the database connection in this application.

* As a customer:
  - Type in node bamazonCustomer.js to begin the application. It will give notice if the connection is made.

  - A table listing will appear with available products in the store. Each product has an ID, a title and a price. Select a product by typing the number of the ID and pressing enter. The next prompt will ask how many of the items to purchase, which is answered by typing in a number again and pressing enter. The two prompts will allow the user to exit by typing 'exit' before the transaction is made.

  - Once a complete order is made, the application will return the receipt with the option to exit or reorder.

* Input Validation:
  - Typing letters and random things will prompt the user on what to input to complete an order.

  - If a quantity is entered that is more the stock available, the application will report insufficent, share what is available and prompt the user to reorder. The application will not subtract from stock if the request is more than what's in stock.

## Shopping Experience
This gif demonstrates entering an ID number and ordering 500 items. The same request is made to show that the database updates the amounts available. The third request shows a more reasonable order and then a choice to leave the store.

![Shopping](https://thumbs.gfycat.com/NeatSomeGeese-size_restricted.gif)

## Exits and Input Validation
This gif demonstrates exiting the the store before confirmation of sales. The next part shows incorrect usages of the application and the prompt to show expected input. The question is restated, so the user is not necessarily taken back to the store's welcome message. The last part shows what happens when the user requests more than what's in stock.

![Database updating and Input Validation](https://thumbs.gfycat.com/EvilWhiteFallowdeer-size_restricted.gif)
