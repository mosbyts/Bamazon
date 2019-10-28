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
    placeOrder();
});

function placeOrder(){
//Display items available
    connection.query("SELECT * FROM products;" + "\n", function(err, availableProducts){
        if (err) throw err;
        console.log("Here is what we have available: ");
        console.log(availableProducts);
    });
//Ask user for input on product
    inquirer.prompt([
        {
            type: "input",
            name: "productID",
            message: "What is the ID of the product you would like to purchase?",
        },
        {
            type: "input",
            name: "productUnits",
            message: "How many units would you like to purchase?",
        }
    ]).then(function(userAnswer){
        connection.query("SELECT product_name, price, stock_quantity FROM products WHERE item_id = " + userAnswer.productID, function(err, res){
            if (err) throw err;
            if(userAnswer.productID <= 5 || userAnswer.productID >= 12){
                console.log("Sorry, we do not have that item available. Please search again.\n");
                placeOrder();
            } else {
                console.log("You have picked " + JSON.stringify(res[0].product_name));
            };
        });
//Conditional statement to determine whether there is enough of the product to sell to the user
           if(userAnswer.productUnits > res.stock_quantity){
                console.log("Insufficient quantity, please try again!");
                placeOrder();
             } else if(userAnswer.productUnits <= res.stock_quantity){
                connection.query("UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: (res.stock_quantity - userAnswer.productUnits),
                      },
                      {
                        productID: userAnswer.productID,
                      }
                    ], function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " product updated!\n");
                        console.log("Order placed. Your item totaled to " + res[0].price);
                    });
            };
    })};
