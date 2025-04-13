CREATE DATABASE hospital_management;
USE hospital_management;

CREATE TABLE patients (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

DROP TABLE patients;

CREATE TABLE users (
	id INT auto_increment primary key,
    username varchar(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

ALTER TABLE users
ADD created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

DESC users;

SELECT *  FROM patients;

INSERT INTO patients (name, email, password) VALUES ('Ahmed', 'dtred54@gmail.com', 'welcome1234');

DESC patients;

SHOW TABLES;

INSERT INTO users (username, email, password) VALUES ('John Doe', 'john@example.com', 'password123');

CREATE TABLE IF NOT EXISTS patients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    birth_date DATE,
    gender VARCHAR(20),
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    country VARCHAR(50),
    city VARCHAR(50),
    region VARCHAR(50),
    postal_code VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO patients (
    name, email, password, phone, birth_date, gender, 
    address_line1, address_line2, country, city, region, postal_code
) VALUES 
(
    'Alice Johnson', 'alice@example.com', 'welcome1234', 
    '9876543210', '1990-05-20', 'Female', 
    '123 Elm Street', 'Apt 4B', 'USA', 'New York', 'NY', '10001'
),
(
    'Bob Smith', 'bob@example.com', 'pass123', 
    '9123456789', '1985-11-15', 'Male', 
    '456 Oak Avenue', NULL, 'USA', 'Los Angeles', 'CA', '90001'
);

SELECT * FROM patients;

SELECT * FROM users;