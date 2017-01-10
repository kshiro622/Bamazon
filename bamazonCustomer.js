//npm packages
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

// 
initialize();

// functions
function initialize() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log("ITEMS FOR SALE");
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Price: " + res[i].price);
        }
        buyProduct();
    });
}

function buyProduct() {
    inquirer.prompt([{
        name: "product_id",
        message: "Enter the ID of the product you'd like to buy."
    }, {
        name: "quantity",
        message: "How many of the product you selected would you like to buy?"
    }]).then(function(answers) {
        connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
            if (answers.quantity > res[0].stock_quantity) {
                console.log("Insufficient quantity!");
                buyProduct();
            } else {
                var newQty = res[0].stock_quantity - answers.quantity;
                var prodSelected;
                connection.query("SELECT product_name FROM products WHERE item_id = ?", [answers.product_id], function(err, res) {
                    prodSelected = res[0].product_name;
                });
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: newQty
                }, {
                    item_id: answers.product_id
                }], function(err, res) {
                    if (err) throw err;
                    console.log("Success, you've purchased " + answers.quantity + " of " + prodSelected + ".");
                    buyProduct();
                });
            }
        });
    });
}
