-- this first group of queries displays data for each table

-- get all rows and their attributes from Orders
-- used to display the Orders table
SELECT orderID, customerID, employeeID, orderDate, totalPrice FROM Orders

-- get all rows and their attributes from Items
-- used to display the Items table
SELECT itemID, itemName, departmentNumber, numberInStock, optimalStock, price FROM Items

-- get all rows and their attributes from ItemOrders
-- used to display the ItemOrders table
SELECT orderID, itemID FROM ItemOrders

-- get all rows and their attributes from Employees
-- used to display the Employees table
SELECT employeeID, firstName, lastName, areaCode, phoneNumber, startDate, email, hoursWorked, title FROM Employees

-- get all rows and their attributes from Departments
-- used to display the Departments table
SELECT departmentNumber, departmentName FROM Departments

-- get all rows and their attributes from Customers
-- used to display the Customers table
SELECT customerID, firstName, lastName, email, phoneNumber, areaCode, accountStartDate FROM Customers

-- get all rows and their attributes from Titles
-- used to display the Titles table
SELECT title, payScale FROM Titles

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- this group of queries inserts into tables

-- adds a row to the Customers table
INSERT INTO `Customers` (firstName, lastName, email, phoneNumber, areaCode, accountStartDate) VALUES (:firstNameInput, :lastNameInput, :emailInput, :phoneNumberInput, :areaCodeInput, :accountStartDateInput);

-- adds a row to the Departments table
INSERT INTO `Departments` (departmentNumber, departmentName) VALUES (:departmentNumberInput, :departmentNameInput);

-- adds a row to the Items table
INSERT INTO `Items` (itemName, departmentNumber, numberInStock, optimalStock, price) VALUES (:itemNameInput, :departmentNumberInput, :numberInStockInput, :optimalStockInput, :priceInput);

-- adds a row to the Titles table
INSERT INTO `Titles` (title, payScale) VALUES (:titleInput, :payScaleInput);

-- adds a row to the Employees table
INSERT INTO `Employees` (firstName, lastName, areaCode, phoneNumber, startDate, email, hoursWorked, title) VALUES (:firstNameInput, :lastNameInput, :areaCodeInput, :phoneNumberInput, :startDateInput, :emailInput, :hoursWorkedInput, :titleInput);

-- adds a row to the Orders table
INSERT INTO `Orders` (customerID, employeeID, orderDate, totalPrice) VALUES (:customerIDInput, :employeeIDInput, :orderDateInput, :totalPriceInput);

-- adds a row to the ItemOrders table
INSERT INTO `ItemOrders` (orderID, itemID) VALUES (:orderIDInput, :itemIDInput);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- this group of queries handles deleting of rows for each table
-- note: foreign keys are all set to cascade on delete

-- deletes row from Customers based on the customer ID
DELETE FROM Customers WHERE customerID = :customerIDInput;

-- deletes row from Departments based on the department number
DELETE FROM Departments WHERE departmentNumber = :departmentNumberInput;

-- deletes row from Items based on the item ID
DELETE FROM Items WHERE itemID = :itemIDInput;

-- deletes row from Titles based on the title
DELETE FROM Titles WHERE title = :titleInput;

-- deletes row from Employees based on employee ID
DELETE FROM Employees WHERE employeeID = :employeeIDInput;

-- deletes row from Orders based on order ID
DELETE FROM Orders WHERE orderID = :orderIDInput;

-- deletes row from ItemOrders based on a composite primary key (order ID and item ID)
DELETE FROM ItemOrders WHERE orderID = :orderIDInput AND itemID = :itemIDInput;

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- this group of queries handles updating of rows for each table
-- note: foreign keys are all set to cascade on update

-- updates all attributes in a row in Customers based on a customerID used to pick which row to modify
UPDATE Customers SET firstName = :firstNameInput, lastName = :lastNameInput, email = :emailInput, phoneNumber = :phoneNumberInput, areaCode = :areaCodeInput, accountStartDate = :accountStartDateInput WHERE customerID = :customerIDInput;

-- updates department name based on the input row given by department number
UPDATE Departments SET departmentName = :departmentNameInput WHERE departmentNumber = :departmentNumberInput;

-- updates all attributes in a row of Items given an itemID to update
UPDATE Items SET itemName = :itemNameInput, departmentNumber = :departmentNumberInput, numberInStock = :numberInStockInput, optimalStockInput = :optimalStockInput, price = :priceInput WHERE itemID = :itemIDInput;

-- updates payScale of a given title
UPDATE Titles SET payScale = :payScaleInput WHERE title = :titleInput;

-- updates row in Employees information given employeeID
UPDATE Employees SET firstName = :firstNameInput, lastName = :lastNameInput, areaCode = :areaCodeInput, phoneNumber = :phoneNumberInput, startDate = :startDateInput, email =  :emailInput, hoursWorked = :hoursWorkedInput, title = :titleInput WHERE employeeID = :employeeIDInput;

-- updates a row in Orders based on orderID
UPDATE Orders SET customerID = :customerIDInput, employeeID = :employeeIDInput, orderDate = :orderDateInput, totalPrice = :totalPriceInput WHERE orderID = :orderIDInput;

-- updates a row in ItemOrders to change orderID and itemID given the old orderID and itemID
UPDATE ItemOrders SET orderID = :newOrderIDInput, itemID = :newItemIDInput WHERE orderID = :orderIDInput AND itemID = :itemIDInput;

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- this group of queries handles filtering of tables

-- filters Orders table by any of its attributes
SELECT orderID, customerID, employeeID, orderDate, totalPrice FROM Orders WHERE orderID LIKE :orderIDInput + '%' AND customerID LIKE :customerIDInput + '%' AND employeeID LIKE :employeeIDInput + '%' AND orderDate LIKE :orderDateInput + '%' AND totalPrice LIKE :totalPriceInput + '%';

-- filters Titles table by any of its attributes
SELECT title, payScale FROM Titles WHERE title LIKE :titleInput + '%' AND payScale LIKE payScaleInput + '%';

-- filters Customers table by any of its attributes
SELECT customerID, firstName, lastName, email, phoneNumber, areaCode, accountStartDate FROM Customers WHERE customerID LIKE :customerIDInput + '%' AND firstName LIKE :firstNameInput + '%' AND lastName LIKE :lastNameInput + '%' AND email LIKE emailInput + '%' AND phoneNumber LIKE :phoneNumberInput + '%' AND areaCode LIKE :areaCodeInput + '%' AND accountStartDate LIKE :accountStartDateInput + '%';

-- filters Items table by any of its attributes
SELECT itemID, itemName, departmentNumber, numberInStock, optimalStock, price FROM Items WHERE itemID LIKE :itemIDInput + '%' AND itemName LIKE :itemNameInput + '%' AND departmentNumber LIKE :departmentNumberInput + '%' AND numberInStock LIKE :numberInStockInput + '%' AND optimalStock LIKE :optimalStockInput + '%' AND price LIKE :priceInput + '%';

-- filters ItemOrders table by any of its attributes
SELECT orderID, itemID FROM ItemOrders WHERE orderID LIKE :orderIDInput + '%' AND itemID LIKE :itemIDInput + '%';

-- filters Departments table by any of its attributes
SELECT departmentNumber, departmentName FROM Departments WHERE departmentNumber LIKE :departmentNumberInput + '%' AND departmentName LIKE :departmentName + '%';

-- filters Employees table by any of its attributes
SELECT employeeID, firstName, lastName, areaCode, phoneNumber, startDate, email, hoursWorked, title FROM Employees WHERE employeeID LIKE :employeeIDInput + '%' AND firstName LIKE :firstNameInput + '%' AND lastName LIKE :lastNameInput + '%' AND areaCode LIKE :areaCodeInput + '%' AND phoneNumber LIKE :phoneNumberInput + '%' AND startDate LIKE :startDateInput + '%' AND email LIKE :emailInput + '%' AND hoursWorked LIKE :hoursWorkedInput + '%' AND title LIKE :titleInput + '%';