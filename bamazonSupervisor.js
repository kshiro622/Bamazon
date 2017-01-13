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
    inquirer.prompt([{
        name: "action",
        message: "Select an action.",
        type: "list",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answers) {
        if (answers.action === "View Product Sales by Department") {
            viewDptSales();
        } else {
            createDpt();
        }
    });
}

function viewDptSales() {
    var salesTable = new Table({
        head: ["Department Id", "Department Name", "Overhead Costs", "Total Sales", "Total Profit"],
        colWidths: [20, 20, 20, 20, 20]
    });
    connection.query("SELECT * FROM departments", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            var deptId = res[i].department_id;
            var deptName = res[i].department_name;
            var overhead = res[i].over_head_costs;
            var totalSales = res[i].total_sales;
            var totalProfit = parseFloat(totalSales) - parseFloat(overhead);
            salesTable.push(
                [deptId, deptName, overhead, totalSales, totalProfit]
            );
        }
        console.log(salesTable.toString());
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
        // department info
        var dptName = answers.departmentName;
        var overheadC = answers.overheadCosts;
        // make sure supervisor wants to add this department
        inquirer.prompt([{
            name: "validation",
            message: "Are you sure you want to add " + answers.product + " to the store?",
            type: "list",
            choices: ["Yes", "No"]
        }]).then(function(answers) {
            if (answers.validation === "Yes") {
                connection.query("INSERT INTO departments SET ?", {
                    department_name: dptName,
                    over_head_costs: overheadC,
                    total_sales: 0.00
                }, function(err, res) {
                    if (err) throw err;
                    console.log("\nThe department " + dptName + " has been added.\n");
                    initialize();
                });
            } else {
                console.log("\nThe department " + dptName + " has not been added.\n");
                initialize();
            }
        });
    });
}
