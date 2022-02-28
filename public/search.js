function searchOrders()
{
    var orderID = document.getElementById('ord-order-id').value;
    var customerID = document.getElementById('ord-customer-id').value;
    var employeeID = document.getElementById('ord-employee-id').value;
    var orderDate = document.getElementById('order-date').value;
    var totalPrice = document.getElementById('total-price').value;
    if (orderID == '')
    {
        orderID = 'empty';
    }
    if (customerID == 'Any')
    {
        customerID = 'empty';
    }
    if (employeeID == 'Any')
    {
        employeeID = 'empty';
    }
    if (orderDate == '')
    {
        orderDate = 'empty';
    }
    if (totalPrice == '')
    {
        totalPrice = 'empty';
    }
    window.location = '/orders/' + encodeURI(orderID) + '/' + encodeURI(customerID) + '/' + encodeURI(employeeID) + '/' +encodeURI(orderDate) + '/' + encodeURI(totalPrice);
}

function searchEmployees()
{
    var employeeID = document.getElementById('emp-employee-id').value;
    var firstName = document.getElementById('emp-first-name').value;
    var lastName = document.getElementById('emp-last-name').value;
    var areaCode = document.getElementById('emp-area-code').value;
    var phoneNumber = document.getElementById('emp-phone-number').value;
    var startDate = document.getElementById('emp-start-date').value;
    var email = document.getElementById('emp-email').value;
    var hoursWorked = document.getElementById('hours-worked').value;
    var title = document.getElementById('emp-title').value;
    if (employeeID == '')
    {
        employeeID = 'empty';
    }
    if (firstName == '')
    {
        firstName = 'empty';
    }
    if (lastName == '')
    {
        lastName = 'empty';
    }
    if (areaCode == '')
    {
        areaCode = 'empty';
    }
    if (phoneNumber == '')
    {
        phoneNumber = 'empty';
    }
    if (startDate == '')
    {
        startDate = 'empty';
    }
    if (email == '')
    {
        email = 'empty';
    }
    if (hoursWorked == '')
    {
        hoursWorked = 'empty';
    }
    if (title == 'Any')
    {
        title = 'empty';
    }
    window.location = '/employees/' + encodeURI(employeeID) + '/' + encodeURI(firstName) + '/' + encodeURI(lastName) + '/' +encodeURI(areaCode) + '/' + encodeURI(phoneNumber) + '/' + encodeURI(startDate) + '/' + encodeURI(email) + '/' + encodeURI(hoursWorked) + '/' + encodeURI(title);
}

function searchItemOrders()
{
    var orderID = document.getElementById('itemord-order-id').value;
    var itemID = document.getElementById('itemord-item-id').value;
    if (orderID == 'Any')
    {
        orderID = 'empty';
    }
    if (itemID == 'Any')
    {
        itemID = 'empty';
    }
    window.location = '/itemOrders/' + encodeURI(orderID) + '/' + encodeURI(itemID);
}

function searchItems()
{
    var itemID = document.getElementById('item-item-id').value;
    var itemName = document.getElementById('itemName').value;
    var departmentNumber = document.getElementById('departmentNumber').value;
    var numberInStock = document.getElementById('numberInStock').value;
    var optimalStock = document.getElementById('optimalStock').value;
    var price = document.getElementById('price').value;
    if (itemID == '')
    {
        itemID = 'empty';
    }
    if (itemName == '')
    {
        itemName = 'empty';
    }
    if (departmentNumber == 'Any')
    {
        departmentNumber = 'empty';
    }
    if (numberInStock == '')
    {
        numberInStock = 'empty';
    }
    if (optimalStock == '')
    {
        optimalStock = 'empty';
    }
    if (price == '')
    {
        price = 'empty';
    }
    window.location = '/items/' + encodeURI(itemID) + '/' + encodeURI(itemName) + '/' + encodeURI(departmentNumber) + '/' +encodeURI(numberInStock) + '/' + encodeURI(optimalStock) + '/' + encodeURI(price);
}

function searchCustomers()
{
    var customerID = document.getElementById('cust-customer-id').value;
    var firstName = document.getElementById('cust-first-name').value;
    var lastName = document.getElementById('cust-last-name').value;
    var email = document.getElementById('cust-email').value;
    var areaCode = document.getElementById('cust-area-code').value;
    var phoneNumber = document.getElementById('cust-phone-number').value;
    var accountStartDate = document.getElementById('acc-start-date').value;
    if (customerID == '')
    {
        customerID = 'empty';
    }
    if (firstName == '')
    {
        firstName = 'empty';
    }
    if (lastName == '')
    {
        lastName = 'empty';
    }
    if (email == '')
    {
        email = 'empty';
    }
    if (areaCode == '')
    {
        areaCode = 'empty';
    }
    if (phoneNumber == '')
    {
        phoneNumber = 'empty';
    }
    if (accountStartDate == '')
    {
        accountStartDate = 'empty';
    }
    window.location = '/customers/' + encodeURI(customerID) + '/' + encodeURI(firstName) + '/' + encodeURI(lastName) + '/' +encodeURI(email) + '/' + encodeURI(phoneNumber) + '/' + encodeURI(areaCode) + '/' + encodeURI(accountStartDate);
}

function searchTitles()
{
    var title = document.getElementById('title-title').value;
    var payScale = document.getElementById('pay-scale').value;
    if (title == '')
    {
        title = 'empty';
    }
    if (payScale == '')
    {
        payScale = 'empty';
    }
    window.location = '/titles/' + encodeURI(title) + '/' + encodeURI(payScale);
}

function searchDepartments()
{
    var departmentNumber = document.getElementById('dep-department-number').value;
    var departmentName = document.getElementById('departmentName').value;
    if (departmentNumber == '')
    {
        departmentNumber = 'empty';
    }
    if (departmentName == '')
    {
        departmentName = 'empty';
    }
    window.location = '/departments/' + encodeURI(departmentNumber) + '/' + encodeURI(departmentName);
}