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
