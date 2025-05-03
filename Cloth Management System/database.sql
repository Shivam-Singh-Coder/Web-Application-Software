-- Drop the database if it exists
DROP DATABASE IF EXISTS cloth_management_system;

-- Create the database
CREATE DATABASE cloth_management_system;
USE cloth_management_system;

-- Drop user if exists
DROP USER IF EXISTS 'cloth'@'localhost';

-- Create user with password
CREATE USER 'cloth'@'localhost' IDENTIFIED WITH mysql_native_password BY 'raysdebuggers';

-- Grant privileges
GRANT ALL PRIVILEGES ON cloth_management_system.* TO 'cloth'@'localhost';
FLUSH PRIVILEGES;

-- Drop tables if they exist
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS EMPLOYEE_DETAILS;

-- create table users
CREATE TABLE USERS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- create table employee details
CREATE TABLE EMPLOYEE_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    emp_id VARCHAR(255) NOT NULL,
    emp_name VARCHAR(255) NOT NULL,
    emp_number VARCHAR(255) NOT NULL,
    emp_email VARCHAR(255) NOT NULL,
    emp_dob VARCHAR(255) NOT NULL,
    emp_gender VARCHAR(255) NOT NULL,
    emp_address VARCHAR(255) NOT NULL
);

-- create customer details
CREATE TABLE CUSTOMER_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    cust_id VARCHAR(255) NOT NULL,
    cust_name VARCHAR(255) NOT NULL,
    cust_number VARCHAR(255) NOT NULL,
    cust_email VARCHAR(255) NOT NULL,
    cust_dob VARCHAR(255) NOT NULL,
    cust_gender VARCHAR(255) NOT NULL,
    cust_address VARCHAR(255) NOT NULL
);

-- create order details
CREATE TABLE ORDER_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    shop_name VARCHAR(255) NOT NULL,
    shop_owner_name VARCHAR(255) NOT NULL,
    shop_number VARCHAR(255) NOT NULL,
    shop_address VARCHAR(255) NOT NULL
);

-- create product details
CREATE TABLE PRODUCT_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    prd_id VARCHAR(255) NOT NULL,
    prd_cat VARCHAR(255) NOT NULL,
    prd_name VARCHAR(255) NOT NULL,
    prd_quantity VARCHAR(255) NOT NULL,
    prd_price VARCHAR(255) NOT NULL
);

-- create employee payment details
CREATE TABLE EMPLOYEE_PAYMENT_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    emp_id VARCHAR(255) NOT NULL,
    pay_date VARCHAR(255) NOT NULL,
    pay_amount VARCHAR(255) NOT NULL,
    pay_status VARCHAR(255) NOT NULL
);

-- create customer payment details
CREATE TABLE CUSTOMER_PAYMENT_DETAILS(
    id INT AUTO_INCREMENT PRIMARY KEY, 
    cust_id VARCHAR(255) NOT NULL,
    total_amount VARCHAR(255) NOT NULL,
    pay_mode VARCHAR(255) NOT NULL,
    pay_date VARCHAR(255) NOT NULL,
    pay_amount VARCHAR(255) NOT NULL,
    pay_status VARCHAR(255) NOT NULL
);

-- create purchased quantity
CREATE TABLE PURCHASED_QUANTITY(
    id INT AUTO_INCREMENT PRIMARY KEY,
    prod_id VARCHAR(255) NOT NULL,
    purchased_quantity VARCHAR(255) NOT NULL,
    purchased_price VARCHAR(255) NOT NULL
);

-- insert record in users
INSERT INTO USERS values(1,"rays", "Rays", "9308654075", "raysdebuggers");

-- insert record in employee details
INSERT INTO EMPLOYEE_DETAILS values(1,"EMP01", "Rays", "9308654075", "raysedutech@gmail.com", "2003-10-12", "male", "Boring Road");

-- inser record in customer details
INSERT INTO CUSTOMER_DETAILS values(1,"CUST01", "Rays", "9308654075", "raysedutech@gmail.com", "2003-10-12", "male", "Boring Road");

-- inser record in order details
INSERT INTO ORDER_DETAILS values(1,"Rays", "REPL", "9308654075", "Boring Road");

-- inser record in product details
INSERT INTO PRODUCT_DETAILS values(1,"PROD01", "Tops", "Dinosaur Print Tee", "20", "250");

-- inser record in employee payment details
INSERT INTO EMPLOYEE_PAYMENT_DETAILS values(1,"1", "2003-10-12", "2300", "Completed");

-- inser record in customer payment details
INSERT INTO CUSTOMER_PAYMENT_DETAILS values(1,"1", "2300", "UPI", "2003-10-12", "2300", "Completed");

-- inser record in purchased quantity
INSERT INTO PURCHASED_QUANTITY values(1,"1", "20", "5000");