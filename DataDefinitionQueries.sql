-- create Customers table
DROP TABLE IF EXISTS `Customers`;
CREATE TABLE `Customers` (
  `customerID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` int,
  `areaCode` int,
  `accountStartDate`date NOT NULL,
    PRIMARY KEY (`customerID`),
    UNIQUE (`customerID`)
 ) ENGINE=InnoDB AUTO_INCREMENT=1;

LOCK TABLES `Customers` WRITE;
INSERT INTO `Customers` (firstName, lastName, email, phoneNumber, areaCode, accountStartDate) VALUES ('John', 'Baker', 'johnb@hotmail.com', 541, 0960707, DATE '1996-12-07'),('Alice','Flintstone','alicef@gmail.com',503,2945678,DATE '2017-03-04'),('Colin','Blanch','colinb@yahoo.com',306,7091112,DATE '2018-06-07');
UNLOCK TABLES;

--create Departments table
DROP TABLE IF EXISTS `Departments`;
CREATE TABLE `Departments` (
  `departmentNumber` int NOT NULL UNIQUE AUTO_INCREMENT,
  `departmentName` varchar(255) NOT NULL,
    PRIMARY KEY (`departmentNumber`)
 );

LOCK TABLES `Departments` WRITE;
INSERT INTO `Departments` (departmentNumber,departmentName) VALUES (1, 'Pharmacy'),(2,'Produce'),(3,'Deli');
UNLOCK TABLES;

--create Items table
DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
  `itemID` int AUTO_INCREMENT NOT NULL UNIQUE,
  `itemName` varchar(255) NOT NULL,
  `departmentNumber` int NOT NULL,
  `numberInStock` int NOT NULL,
  `optimalStock` int NOT NULL,
  `price` double NOT NULL,
    PRIMARY KEY (`itemID`),
    FOREIGN KEY (`departmentNumber`)
    REFERENCES `Departments` (`departmentNumber`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
 ) ENGINE=InnoDB AUTO_INCREMENT=1;

LOCK TABLES `Items` WRITE;
INSERT INTO `Items` (itemName,departmentNumber,numberInStock,optimalStock,price) VALUES ('Banana', 2, 124, 200, 0.59),('Ham', 3, 52, 80, 5.59),('Advil', 1, 25, 30, 27.99);
UNLOCK TABLES;

--create Titles table
DROP TABLE IF EXISTS `Titles`;
CREATE TABLE `Titles` (
  `title` varchar(255) NOT NULL,
  `payScale` double NOT NULL,
   PRIMARY KEY (`title`)
    );

LOCK TABLES `Titles` WRITE;
INSERT INTO `Titles` (title, payScale) VALUES ('Manager', 22.00),('Cashier', 14.00),('Store Manager', 30.00);
UNLOCK TABLES;

--create Employees table

DROP TABLE IF EXISTS `Employees`;
CREATE TABLE `Employees` (
  `employeeID` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `areaCode` int,
  `phoneNumber` int,
  `startDate` date NOT NULL,
  `email` varchar(255) NOT NULL,
  `hoursWorked` int NOT NULL,
  `title` varchar(255) NOT NULL,
    PRIMARY KEY (`employeeID`),
    FOREIGN KEY (`title`)
    REFERENCES `Titles` (`title`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=1;

LOCK TABLES `Employees` WRITE;
INSERT INTO `Employees` (firstName, lastName, areacode, phoneNumber, startDate, email, hoursWorked, title) VALUES ('Sam','Smith',503,2440990,DATE '2012-12-12','smiths@gmail.com',40,'Manager'),('Sally','Sampson',541,3091278,DATE '2016-02-20', 'sallys@gmail.com',30,'Cashier'),('Billy','Banks',642,3033030,DATE '2020-10-08','billb@gmail.com',40,'Store Manager');
UNLOCK TABLES;
     
--create Orders table
DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `orderId` int NOT NULL AUTO_INCREMENT UNIQUE,
  `customerID` int NOT NULL,
  `employeeID` int,
  `orderDate` date NOT NULL,
  `totalPrice` double NOT NULL,
    PRIMARY KEY (`orderID`),
    FOREIGN KEY (`customerID`)
    REFERENCES `Customers` (`customerID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`employeeID`)
    REFERENCES `Employees` (`employeeID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    ) ENGINE=InnoDB AUTO_INCREMENT=1;

LOCK TABLES `Orders` WRITE;
INSERT INTO `Orders` (customerID, employeeID, orderDate, totalPrice) VALUES (1,1,DATE '2018-11-18',6.18),(2,2,DATE '2019-02-02',27.99),(3,3,DATE '2021-09-14',34.17);
UNLOCK TABLES;

--create ItemOrders table
DROP TABLE IF EXISTS `ItemOrders`;

CREATE TABLE `ItemOrders` (
  `orderId` int NOT NULL,
  `itemID` int NOT NULL,
    PRIMARY KEY (orderID,itemID),
    FOREIGN KEY (`orderID`)
    REFERENCES `Orders` (`orderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`itemID`)
    REFERENCES `Items` (`itemID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );

LOCK TABLES `ItemOrders` WRITE;
INSERT INTO `ItemOrders` (orderID,itemID) VALUES (1,1),(1,2),(2,3),(3,1),(3,2),(3,3);
UNLOCK TABLES;