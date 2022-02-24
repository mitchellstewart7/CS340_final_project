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
    if (customerID == '')
    {
        customerID = 'empty';
    }
    if (employeeID == '')
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