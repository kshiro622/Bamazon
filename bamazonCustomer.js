//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password.js");

//database connection info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: password.mySqlPw.password,
    database: "bamazon_db"
});

//connects to database
connection.connect(function(err) {
    if (err) throw err;
});

// intializes app
initialize();

// functions
function initialize() {
    // selects all data from products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // logs info (ID, product, price) about all items for sale
        console.log("ITEMS FOR SALE");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Price: " + res[i].price);
        }
        // runs function to purchase items
        buyProduct();
    });
}

// function to purchase items
function buyProduct() {
    // prompts user for id and quantity of product they want to purchase
    inquirer.prompt([{
        name: "product_id",
        message: "Enter the ID of the product you'd like to buy."
    }, {
        name: "quantity",
        message: "How many of the product you selected would you like to buy?"
    }]).then(function(answers) {
        // selects quantity of item user specified in prompt above
        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
            // there is not enough in stock to fulfill purchase
            if (answers.quantity > res[0].stock_quantity) {
                console.log("Insufficient quantity!");
                // restarts function to buy items
                buyProduct();
            } else {
                // there is enough in stock to fulfill purchase
                var newQty = res[0].stock_quantity - answers.quantity;
                var prodSelected;
                var price;
                // set product_name equal to prodSelected and price equal to price
                connection.query("SELECT * FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
                    prodSelected = res[0].product_name;
                    price = res[0].price;
                });
                // update table with new quantity
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQty
                }, {
                    item_id: answers.product_id
                }], function(err, res) {
                    if (err) throw err;
                    // total price is price of 1 item * quantity purchased
                    var total = price * answers.quantity;
                    // let user know of their success in purchasing their items
                    console.log("Success, you've purchased " + answers.quantity + " of " + prodSelected + " for the price of $" + total + ".");
                    // restarts function to buy items
                    buyProduct();
                });
            }
        });
    });
}
