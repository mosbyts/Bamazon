//Required packages
var mySQL = require("mysql");
var inquirer = require("inquirer");
//Create connection to database
var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});
//Connect to database
connection.connect(function(err){
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    console.log("Welcome To Bamazon By Tianna!\n")
    console.log("Here is what we have available: \n");
    placeOrder();
});

function placeOrder(){
//Display items available
    connection.query("SELECT * FROM products;" + "\n", function(err, availableProducts){
        if (err) throw err;
        console.log("\n");
        console.table(availableProducts);
        console.log("\n");
    })
//Ask user for input on product
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "What is the ID of the product you would like to purchase?\n",
        },
        {
            type: "input",
            name: "productUnits",
            message: "How many units would you like to purchase?\n",
        }
    ]).then(function(userAnswer){
//Compare user input to actual product IDs
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = " + userAnswer.productID, function(err, productResponse){
            if (err) throw err;
            if(userAnswer.productID <= 5 || userAnswer.productID >= 12){
                console.log("Sorry, we do not have that item available. Please search again.\n");
                placeOrder();
            } else {
                console.log("You have picked " + JSON.stringify(productResponse[0].product_name));
            };
//Conditional statement to determine whether there is enough of the product to sell to the user
        var updateStock = parseInt(productResponse[0].stock_quantity - userAnswer.productUnits);

           if(userAnswer.productUnits > productResponse[0].stock_quantity){
                console.log("Insufficient quantity, please try again!");
                placeOrder();
             } else if(userAnswer.productUnits <= productResponse[0].stock_quantity){
                connection.query(("UPDATE products SET stock_quantity = " + updateStock +  " WHERE item_id = " + parseInt(userAnswer.productID)), function(err, res) {
                        if (err) throw err;
                        var calculatePrice = productResponse[0].price * userAnswer.productUnits;
                        console.log("Your item has totaled to $" + calculatePrice);
                        inquirer.prompt([
                            {
                                type: "list",
                                name: "payment",
                                message: "How would you like to pay today?",
                                choices: ["Credit Card", "Debit Card", "Apple Pay"]
                            },
                        ]).then(function(paymentMethod){
                            console.log("You have picked " + paymentMethod.payment + ". Your order has been placed. Please expect it to arrive within 5-7 business days. Goodbye!")
                        });
                    connection.end();
                });
            };
        });
    })};
