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
 );

--create Departments table
 DROP TABLE IF EXISTS `Departments`;
CREATE TABLE `Departments` (
  `departmentNumber` int NOT NULL UNIQUE,
  `departmentName` varchar(255) NOT NULL,
    PRIMARY KEY (`departmentNumber`)
 );

--create Items table
DROP TABLE IF EXISTS `Items`;
CREATE TABLE `Items` (
  `itemID` int AUTO_INCREMENT NOT NULL UNIQUE,
  `itemName` varchar(255) NOT NULL,
  `departmentNumber` int NOT NULL,
  `numberInStock` int NOT NULL,
  `optimalStock` int NOT NULL,
  `price` double NOT NULL,
    PRIMARY KEY (`departmentNumber`),
    FOREIGN KEY (`departmentNumber`)
    REFERENCES `Departments` (`departmentNumber`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
 );

--create Titles table
DROP TABLE IF EXISTS `Titles`;
CREATE TABLE `Titles` (
  `title` varchar(255) NOT NULL,
  `payScale` double NOT NULL,
   PRIMARY KEY (`title`)
    );

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
    );
     
--create Orders table
DROP TABLE IF EXISTS `Orders`;

CREATE TABLE `Orders` (
  `orderId` int NOT NULL AUTO_INCREMENT UNIQUE,
  `customerID` int NOT NULL UNIQUE,
  `employeeID` int UNIQUE,
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
    );

--create ItemOrders table
DROP TABLE IF EXISTS `ItemOrders`;

CREATE TABLE `ItemOrders` (
  `orderId` int NOT NULL,
  `itemID` int NOT NULL,
    FOREIGN KEY (`orderID`)
    REFERENCES `Orders` (`orderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`itemID`)
    REFERENCES `Items` (`itemID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
    );