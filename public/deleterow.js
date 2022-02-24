function deleteOrder(orderID){
    $.ajax({
        url: '/orders/' + orderID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteItem(itemID){
    $.ajax({
        url: '/items/' + itemID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteCustomer(customerID){
    $.ajax({
        url: '/customers/' + customerID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteEmployee(employeeID){
    $.ajax({
        url: '/employees/' + employeeID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteItemOrder(orderID, itemID){
    $.ajax({
        url: '/itemOrders/' + orderID + '/' + itemID,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteTitle(title){
    $.ajax({
        url: '/titles/' + title,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deleteDepartment(departmentNumber){
    $.ajax({
        url: '/departments/' + departmentNumber,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};