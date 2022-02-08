/* 
setup
*/
// express
var express = require('express');
var app = express();
PORT = process.env.PORT || 4246;
var path = require('path');

//var db = require('./db-connector');

app.get('/', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/items', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/items.html'));
});

app.get('/customers', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/customers.html'));
});

app.get('/employees', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/employees.html'));
});

app.get('/orders', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/orders.html'));
});

app.get('/titles', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/titles.html'));
});

app.get('/departments', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/departments.html'));
});

app.get('/itemOrders', function(req, res, next)
{
    res.sendFile(path.join(__dirname+'/itemOrders.html'));
});


/*
listener
*/
app.listen(PORT, function(){
    // recieves incoming requests on specified PORT
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});