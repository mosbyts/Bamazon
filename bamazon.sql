create database bamazon;

use bamazon;

create table products (
	item_id int auto_increment not null,
    product_name varchar(100),
    department_name varchar(50),
    price decimal(5,2),
    stock_quantity int,
    primary key (item_id)
);

USE bamazon;

insert into products (product_name, department_name, price, stock_quantity) values 
("Track Runner Wall Painting", "Home Decor", 75.00, 15), 
("iPhone 5","Electronics", 199.99 , 1000),
("12 Pack Carton of Eggs","Grocery", 4.99 , 50),
("Dell Laptop","Electronics", 449.99 , 3),
("8oz Bag of Coffee Beans","Grocery", 8.85 , 1250);

SELECT * FROM products;