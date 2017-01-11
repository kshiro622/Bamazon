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

initialize();

function initialize() {
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answers) {
        if (answers.action === "View Products for Sale") {
            viewProd();
        } else if (answers.action === "View Low Inventory") {
            viewLow();
        } else if (answers.action === "Add to Inventory") {
            var products = [];
            connection.query("SELECT product_name FROM products", function(err, res) {
                for (h = 0; h < res.length; h++) {
                    products.push(res[h].product_name);
                }
                addInv(products);
            });
        } else if (answers.action === "Add New Product") {
            addProd();
        }
    });
}

function viewProd() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Price: " + res[i].price +
                " || Stock Qty: " + res[i].stock_quantity +
                " || Department: " + res[i].department_name +
                "\n");
        }
        initialize();
    });
}

function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5], function(err, res) {
        if (err) throw err;
        if (res.length > 1) {
            for (var j = 0; j < res.length; j++) {
                console.log("ID: " + res[j].item_id +
                    " || Product: " + res[j].product_name +
                    " || Price: " + res[j].price +
                    " || Stock Qty: " + res[j].stock_quantity +
                    " || Department: " + res[j].department_name +
                    "\n");
            }
        } else {
            console.log("\nThere are no low inventory items!\n");
        }
        initialize();
    });
}

function addInv(array) {
    inquirer.prompt([{
        name: "item",
        message: "Which item would you like to add inventory to?",
        type: "list",
        choices: array
    }, {
        name: "amount",
        message: "How many more units would you like to add?"
    }]).then(function(answers) {
        connection.query("SELECT stock_quantity FROM products WHERE product_name = ?", [answers.item], function(err, res) {
            var stockQty = parseInt(answers.amount) + parseInt(res[0].stock_quantity);
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: stockQty
            }, {
                product_name: answers.item
            }], function(err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log("The inventory for " + answers.item + " is now " + stockQty + " units.\n");
                }
                initialize();
            });
        });
    });
}

function addProd() {
    inquirer.prompt([{
        name: "product",
        message: "Enter name of product you would like to add."
    }, {
        name: "price",
        message: "Enter price of product to be added."
    }, {
        name: "quantity",
        message: "Enter quantity of product to be added."
    }, {
        name: "department",
        message: "Enter name of department of product to be added."
    }]).then(function(answers) {
        var product = answers.product;
        var price = answers.price;
        var quantity = answers.quantity;
        var department = answers.department;
        inquirer.prompt([{
            name: "validation",
            message: "Are you sure you want to add " + answers.product + " to the store?",
            type: "list",
            choices: ["Yes", "No"]
        }]).then(function(answers) {
            if (answers.validation === "Yes") {
                connection.query("INSERT INTO products SET ?", {
                    product_name: product,
                    price: price,
                    department_name: department,
                    stock_quantity: quantity
                }, function(err, res) {
                    if (err) {
                        throw err;
                    } else {
                        console.log("\nYour item has been added.\n");
                        initialize();
                    }
                });
            } else {
                console.log("\nYour item has not been added.\n");
                initialize();
            }
        });
    });
}
