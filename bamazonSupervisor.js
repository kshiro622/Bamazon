//dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");
var password = require("./password.js");
var Table = require("cli-table");

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
    // prompt user for action
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answers) {
        // run appropriate function per answer above
        if (answers.action === "View Product Sales by Department") {
            viewDptSales();
        } else {
            createDpt();
        }
    });
}

function viewDptSales() {
    // create new table
    var salesTable = new Table({
        head: ["Id", "Department Name", "Overhead", "Total Sales", "Total Profit"],
        colWidths: [5, 20, 15, 15, 15]
    });
    // select info from departments table
    connection.query("SELECT * FROM departments", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            // variables to store column data
            var deptId = res[i].department_id;
            var deptName = res[i].department_name;
            var overhead = res[i].over_head_costs;
            var totalSales = res[i].total_sales;
            var totalProfit = (Math.round((totalSales - overhead) * 100)) / 100;
            // push column data into table for each department
            salesTable.push(
                [deptId, deptName, overhead, totalSales, totalProfit]
            );
        }
        // print table to console
        console.log(salesTable.toString());
        // re-initialize app
        initialize();
    });
}

function createDpt() {
    inquirer.prompt([{
        name: "departmentName",
        message: "Enter name of department."
    }, {
        name: "overheadCosts",
        message: "Enter overhead costs of department."
    }]).then(function(answers) {
        // variables to store department info
        var dptName = answers.departmentName;
        var overheadC = answers.overheadCosts;
        // make sure supervisor wants to add this department
        inquirer.prompt([{
            name: "validation",
            message: "Are you sure you want to add " + dptName + " to the store?",
            type: "list",
            choices: ["Yes", "No"]
        }]).then(function(answers) {
            if (answers.validation === "Yes") {
                // if yes, insert department into table
                connection.query("INSERT INTO departments SET ?", {
                    department_name: dptName,
                    over_head_costs: overheadC,
                    total_sales: 0.00
                }, function(err, res) {
                    if (err) throw err;
                    // print that department has been added
                    console.log("\nThe department " + dptName + " has been added.\n");
                    // re-initialize app
                    initialize();
                });
            } else {
                // if no, print that department has not been added
                console.log("\nThe department " + dptName + " has not been added.\n");
                //re-initialize app
                initialize();
            }
        });
    });
}
