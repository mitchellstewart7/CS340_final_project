var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
PORT = process.env.PORT || 4262;

var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
//app.set('port', process.argv[2]);
app.set('mysql', mysql);
app.use('/customers', require('./customers.js'));
app.use('/employees', require('./employees.js'));
app.use('/items', require('./items.js'));
app.use('/titles', require('./titles.js'));
app.use('/departments', require('./departments.js'));
app.use('/itemOrders', require('./itemOrders.js'));
app.use('/orders', require('./orders.js'));
app.use('/', express.static('public'));

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

// app.listen(app.get('port'), function(){
//   console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
// });

app.listen(PORT, function(){
    // recieves incoming requests on specified PORT
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.');
});