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
            addInv();
        } else if (answers.action === "Add New Product") {
            addProd();
        }
    });
}

function viewProd() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id +
                " || Product: " + res[i].product_name +
                " || Price: " + res[i].price +
                " || Stock Qty: " + res[i].stock_quantity +
                " || Department: " + res[i].department_name +
                "\n");
        }
    });
}
