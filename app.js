/* 
setup
*/
// express
var express = require('express');
var app = express();
PORT = process.env.PORT || 4245;
var path = require('path');

//var db = require('./db-connector');

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/items.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/customers.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/employees.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/', function(req, res)
{
    res.sendFile(path.join(__dirname+'/index.html'));
});


/*
listener
*/
app.listen(PORT, function(){
    // recieves incoming requests on specified PORT
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});