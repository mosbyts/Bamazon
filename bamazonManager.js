//Dependencies
var mySQL = require("mysql");
var inquirer = require("inquirer");

//Connect to database
var connection = mySQL.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connected as ID " + connection.threadId + "\n");
    console.log("Welcome to the Bamazon by Tianna manager view!\n");
});

function selectMenu(){
    inquirer.prompt([
        {
            type: "",
            name: "selectMenu",
            message: "What would you like to do",
            choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
        }
    ]).then(function(choice){
        if(choice = ""){
            checkInventory();
        } else if(choice = ""){
            checkLowInventory();
        } else if(choice = ""){
            addInventory();
        } else if(choice = ""){
            newProduct();
        }
    })
}

//Display current entire inventory
function checkInventory(){
    connection.query("SELECT * FROM products;" + "\n", function(err, inventory){
        if(err) throw err;
        console.log("\n");
        console.table(inventory);
        console.log("\n");
    });
};
//Display inventory with less than five count
function checkLowInventory(){
    connection.query("SELECT *** FROM products WHERE stock_quantity <= 5;" + "\n", function(err, lowInventory){
        if(err) throw err;
        console.log("\n");
        console.table(lowInventory);
        console.log("\n");
    })
};
//Add more to current inventory
function addInventory(){
    connection.query("UPDATE ***;" + "\n", function(err, newInventory){
        if(err) throw err;
        console.log("\n");
        console.table("You have added " + newInventory);
        console.log("\n")
    });
};
//Add new product to the store
function newProduct(){
    connection.query("INSERT *** INTO products;" + "\n", function(err, newProduct){
        if(err) throw err;
        console.log("\n");
        console.log(newProduct);
        console.log("\n");
    })
}