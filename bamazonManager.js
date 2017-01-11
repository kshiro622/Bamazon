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

<<<<<<< HEAD
//initializes app
initialize();

// ========== FUNCTIONS =========== //

function initialize() {
    // manager action menu
=======
initialize();

function initialize() {
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }]).then(function(answers) {
<<<<<<< HEAD
        // run appropriate function per answer above
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        if (answers.action === "View Products for Sale") {
            viewProd();
        } else if (answers.action === "View Low Inventory") {
            viewLow();
        } else if (answers.action === "Add to Inventory") {
<<<<<<< HEAD
            // create an array of current products
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
            var products = [];
            connection.query("SELECT product_name FROM products", function(err, res) {
                for (h = 0; h < res.length; h++) {
                    products.push(res[h].product_name);
                }
<<<<<<< HEAD
                // run add inventory function, pass in products array
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
                addInv(products);
            });
        } else if (answers.action === "Add New Product") {
            addProd();
        }
    });
}

function viewProd() {
<<<<<<< HEAD
    // select all data from products table
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // log info for all products in database
=======
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        for (var i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Price: " + res[i].price +
                " || Stock Qty: " + res[i].stock_quantity +
                " || Department: " + res[i].department_name +
                "\n");
        }
<<<<<<< HEAD
        // re-initilize app
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        initialize();
    });
}

function viewLow() {
<<<<<<< HEAD
    // selects all data from products where stock quantity is < 5
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5], function(err, res) {
        if (err) throw err;
        // if there is at least 1 result, display info for product(s)
=======
    connection.query("SELECT * FROM products WHERE stock_quantity < ?", [5], function(err, res) {
        if (err) throw err;
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        if (res.length > 1) {
            for (var j = 0; j < res.length; j++) {
                console.log("ID: " + res[j].item_id +
                    " || Product: " + res[j].product_name +
                    " || Price: " + res[j].price +
                    " || Stock Qty: " + res[j].stock_quantity +
                    " || Department: " + res[j].department_name +
                    "\n");
            }
<<<<<<< HEAD
            // if there are no results, let user know
        } else {
            console.log("\nThere are no low inventory items!\n");
        }
        // re-initialize app
=======
        } else {
            console.log("\nThere are no low inventory items!\n");
        }
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        initialize();
    });
}

function addInv(array) {
<<<<<<< HEAD
    // ask user info to add inventory
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
    inquirer.prompt([{
        name: "item",
        message: "Which item would you like to add inventory to?",
        type: "list",
        choices: array
    }, {
        name: "amount",
        message: "How many more units would you like to add?"
    }]).then(function(answers) {
<<<<<<< HEAD
        // select the stock qty from products for product user specified above
        connection.query("SELECT stock_quantity FROM products WHERE product_name = ?", [answers.item], function(err, res) {
            // add previous amount and amount being added
            var stockQty = parseInt(answers.amount) + parseInt(res[0].stock_quantity);
            // update table with new stock quantity
=======
        connection.query("SELECT stock_quantity FROM products WHERE product_name = ?", [answers.item], function(err, res) {
            var stockQty = parseInt(answers.amount) + parseInt(res[0].stock_quantity);
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: stockQty
            }, {
                product_name: answers.item
            }], function(err, res) {
                if (err) {
                    throw err;
                } else {
<<<<<<< HEAD
                    // let user know the stock quantity has been updated
                    console.log("The inventory for " + answers.item + " is now " + stockQty + " units.\n");
                }
                //re-initialize app
=======
                    console.log("The inventory for " + answers.item + " is now " + stockQty + " units.\n");
                }
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
                initialize();
            });
        });
    });
}

function addProd() {
<<<<<<< HEAD
    // ask user info about new product
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
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
<<<<<<< HEAD
        // product info variables
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        var product = answers.product;
        var price = answers.price;
        var quantity = answers.quantity;
        var department = answers.department;
<<<<<<< HEAD
        // make sure user wants to add their product
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
        inquirer.prompt([{
            name: "validation",
            message: "Are you sure you want to add " + answers.product + " to the store?",
            type: "list",
            choices: ["Yes", "No"]
        }]).then(function(answers) {
<<<<<<< HEAD
            // if yes, insert product and info into products table
=======
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
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
<<<<<<< HEAD
                        //re-initialize app
                        initialize();
                    }
                });
                // if no, let user know product has not been added
            } else {
                console.log("\nYour item has not been added.\n");
                //re-initialize app
=======
                        initialize();
                    }
                });
            } else {
                console.log("\nYour item has not been added.\n");
>>>>>>> 1424ef524d9b7f7a2e5797fc250423a8d7a980f6
                initialize();
            }
        });
    });
}
