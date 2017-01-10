//npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

//database connection info
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "shiro210130",
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
            } else {
                console.log("success");
            }
        });
    });
}
