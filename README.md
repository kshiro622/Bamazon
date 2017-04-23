# Bamazon
Storefront app with functionality for customers to buy products, managers to view products and add inventory, and supervisors to view total profits.

## Technologies
Node.js, MySQL, Javascript

## Built with
- Sublime Text - Text editor
- Javascript
- Node.js - Backend
- GitHub - Cloud-based storage and version control
- MySQL - Database
- Terminal - Runs node app

## How it Works

1. Clone repo to your local machine
2. Create a password.js file with the following code, and insert your password where it says "your password here."
    
    exports.mySqlPw = {
        password: 'your password here'
    };

3. Create database and tables in MySQL using the code in schema file
4. Install depedencies from package.json file

##### Customer App
Customers view all products for sale, then choose one to purchase. Once they've entered in the product and quantity, the app will complete the purchase if there is enough inventory. 

5. Enter "node bamazonCustomer.js" into the command line
6. Follow the prompts to buy products

##### Manager App
Managers have four options, to view products for sale, view products with low inventory, add stock to a product, and add new products to be sold.

5. Enter "node bamazonManager.js" into the command line
6. Follow the prompts to view products, view low inventory products, add stock, or add products

##### Supervisor App
Supervisors can either view all departments and their overhead and sales figures, or add new departments.

5. Enter "node bamazonSupervisor.js" into the command line
6. Follow prompts to view all departments and their info, or add a new department

## Link to App Videos
https://drive.google.com/drive/folders/0B1wOinmZNrZIZ2hIQjJHc2ZKZ3c
