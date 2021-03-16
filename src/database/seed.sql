CREATE DATABASE IF NOT EXISTS budgeteer;

USE budgeteer;
SET sql_notes = 0;

CREATE TABLE IF NOT EXISTS users (
    user_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username varchar(255) NOT NULL
);
CREATE TABLE IF NOT EXISTS accounts (
    account_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id int(11) NOT NULL,
    name varchar(255) NOT NULL,
    account_number varchar(255),
    type_id int(11) NOT NULL,
    balance decimal(11, 2) 
);
CREATE TABLE IF NOT EXISTS account_types (
    type_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    percentage decimal(11,2) NOT NULL
);
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date varchar(255),
    type_id int(11) NOT NULL,
    amount decimal(11,2),
    account_id int(11) NOT NULL
);

SET sql_notes = 1;