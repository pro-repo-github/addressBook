CREATE DATABASE addressbook;
USE addressbook;
CREATE TABLE addresses (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(255) NOT NULL,
surname VARCHAR(255) NOT NULL,
street VARCHAR(255),
postcode VARCHAR(255),
place VARCHAR(255),
country VARCHAR(255));
INSERT INTO addresses(firstname, surname, street, postcode, place, country)
VALUES('Peter', 'Muller', 'Zürichstr 110', '8000', 'Zürich', 'Schweiz'); 
