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

//initializes app
initialize();

// ========== FUNCTIONS =========== //

function initialize() {
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answers) {
        console.log(answers.action);
    });
}
