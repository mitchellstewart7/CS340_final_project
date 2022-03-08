function toggleOrdersModal(orderID, customerID, employeeID, orderDate, totalPrice)
{
    console.log(orderDate);
    //populate form with current data
    document.getElementById('update-ord-customer-id').value = customerID;
    if (employeeID == '')
    {
        document.getElementById('update-ord-employee-id').value = "None"
    }
    else { 
        document.getElementById('update-ord-employee-id').value = employeeID;
    }
    document.getElementById('update-order-date').value = orderDate;
    document.getElementById('update-total-price').value = totalPrice;

    console.log(document.getElementById('update-ord-customer-id').value);
    console.log(document.getElementById('update-ord-employee-id').value);
    console.log(document.getElementById('update-order-date').value);
    console.log(document.getElementById('update-total-price').value);

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#orders-update-form').submit(function(event) {
        event.preventDefault();
        if (document.getElementById('update-ord-customer-id').value == '' || document.getElementById('update-order-date').value == '' || document.getElementById('update-total-price').value == '')
        {
            alert('Customer ID, Order Date, and Total Price are required fields');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/orders/' + orderID,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleTitlesModal(title, payScale)
{
    //console.log(orderDate);
    //populate form with current data
    document.getElementById('update-pay-scale').value = payScale;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#titles-update-form').submit(function(event) {
        event.preventDefault();
        if (document.getElementById('update-pay-scale').value == '')
        {
            alert('Pay Scale is a required field');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/titles/' + title,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleItemsModal(itemID, itemName, departmentNumber, numberInStock, optimalStock, price)
{
    //console.log(orderDate);
    //populate form with current data
    document.getElementById('update-itemName').value = itemName;
    document.getElementById('update-departmentNumber').value = departmentNumber;
    document.getElementById('update-numberInStock').value = numberInStock;
    document.getElementById('update-optimalStock').value = optimalStock;
    document.getElementById('update-price').value = price;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#items-update-form').submit(function(event) {
        event.preventDefault();
        if (document.getElementById('update-itemName').value == '' || document.getElementById('update-departmentNumber').value == '' || document.getElementById('update-numberInStock').value == '' || document.getElementById('update-optimalStock').value == '' || document.getElementById('update-price').value == '')
        {
            alert('Item Name, Department Number, Number In Stock, Optimal Stock, and Price are required fields');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/items/' + itemID,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleItemOrdersModal(orderID, itemID)
{
    //console.log(orderDate);
    //populate form with current data
    document.getElementById('update-itemord-order-id').value = orderID;
    document.getElementById('update-itemord-item-id').value = itemID;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#itemOrders-update-form').submit(function(event) {
        if (document.getElementById('update-itemord-order-id').value == '' || document.getElementById('update-itemord-item-id').value == '')
        {
            alert('Order ID and Item ID are required fields');
        }
        else
        {
            event.preventDefault();
            var $form = $(this);
            $.ajax({
                url: '/itemOrders/' + orderID + '/' + itemID,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleEmployeesModal(employeeID, firstName, lastName, areaCode, phoneNumber, startDate, email, hoursWorked, title)
{
    //populate form with current data
    document.getElementById('update-emp-first-name').value = firstName;
    document.getElementById('update-emp-last-name').value = lastName;
    document.getElementById('update-emp-area-code').value = areaCode;
    document.getElementById('update-emp-phone-number').value = phoneNumber;
    document.getElementById('update-emp-start-date').value = startDate;
    document.getElementById('update-emp-email').value = email;
    document.getElementById('update-hours-worked').value = hoursWorked;
    document.getElementById('update-emp-title').value = title;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#employees-update-form').submit(function(event) {
        event.preventDefault();
        if (document.getElementById('update-emp-first-name').value == '' || document.getElementById('update-emp-last-name').value == '' || document.getElementById('update-emp-start-date').value == '' || document.getElementById('update-emp-email').value == '' || document.getElementById('update-hours-worked').value == '' || document.getElementById('update-emp-title').value == 'Any')
        {
            alert('First Name, Last Name, Start Date, Email, Hours Worked, and Title are required fields');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/employees/' + employeeID,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleCustomersModal(customerID, firstName, lastName, email, areaCode, phoneNumber, accountStartDate)
{
    //populate form with current data
    document.getElementById('update-cust-first-name').value = firstName;
    document.getElementById('update-cust-last-name').value = lastName;
    document.getElementById('update-cust-email').value = email;
    document.getElementById('update-cust-area-code').value = areaCode;
    document.getElementById('update-cust-phone-number').value = phoneNumber;
    document.getElementById('update-acc-start-date').value = accountStartDate;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#customers-update-form').submit(function(event) {
        event.preventDefault();
        if (document.getElementById('update-cust-first-name').value == '' || document.getElementById('update-cust-last-name').value == '' || document.getElementById('update-cust-email').value == '' || document.getElementById('update-acc-start-date').value == '')
        {
            alert('First Name, Last Name, Email, and Account Start Date are required fields');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/customers/' + customerID,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}

function toggleDepartmentsModal(departmentNumber, departmentName)
{
    //populate form with current data
    document.getElementById('update-departmentName').value = departmentName;

    var modalBackdrop = document.getElementById('modal-backdrop');
    var modal = document.getElementById('update-modal');
    modalBackdrop.classList.toggle('hidden');
    modal.classList.toggle('hidden');

    $('#departments-update-form').submit(function(event) {

        event.preventDefault();
        if (document.getElementById('update-departmentName').value == '')
        {
            alert('Department Name is a required field');
        }
        else
        {
            var $form = $(this);
            $.ajax({
                url: '/departments/' + departmentNumber,
                type: 'PUT',
                data: $form.serialize(),
                success: function(result){
                    window.location.reload(true);
                }
            })
        }
    });
}