module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT orderID, customerID, employeeID, orderDate, totalPrice FROM Orders ORDER BY orderID ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            for (var i = 0; i < results.length; i++)
            {
                //console.log(results[i].orderDate);
                var datestr = new Date(results[i].orderDate);

                date = JSON.stringify(datestr);
                date = date.slice(1,11);
                results[i].orderDate = date;
                //console.log(date);  
            }
            context.orders = results;
            complete();
        });
    }

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID FROM Customers ORDER BY customerID ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        });
    }

    function getEmployees(res, mysql, context, complete){
        mysql.pool.query("SELECT employeeID from Employees ORDER BY employeeID ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.employees = results;
            complete();
        });
    }

    // function getPeoplebyHomeworld(req, res, mysql, context, complete){
    //   var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.homeworld = ?";
    //   console.log(req.params)
    //   var inserts = [req.params.homeworld]
    //   mysql.pool.query(query, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.people = results;
    //         complete();
    //     });
    // }

    // /* Find people whose fname starts with a given string in the req */
    // function getPeopleWithNameLike(req, res, mysql, context, complete) {
    //   //sanitize the input as well as include the % character
    //    var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.fname LIKE " + mysql.pool.escape(req.params.s + '%');
    //   console.log(query)

    //   mysql.pool.query(query, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.people = results;
    //         complete();
    //     });
    // }

    // function getPerson(res, mysql, context, id, complete){
    //     var sql = "SELECT character_id as id, fname, lname, homeworld, age FROM bsg_people WHERE character_id = ?";
    //     var inserts = [id];
    //     mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.person = results[0];
    //         complete();
    //     });
    // }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getOrders(res, mysql, context, complete);
        getCustomers(res, mysql, context, complete);
        getEmployees(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('orders', context);
            }

        }
    });

    function getOrdersLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
        var query = "SELECT orderID, customerID, employeeID, orderDate, totalPrice FROM Orders WHERE orderID LIKE " + mysql.pool.escape(req.params.orderID + '%') + "AND customerID LIKE " + mysql.pool.escape(req.params.customerID + '%') + "AND employeeID LIKE "+ mysql.pool.escape(req.params.employeeID + '%') + "AND orderDate LIKE "+ mysql.pool.escape(req.params.orderDate + '%') + "AND totalPrice LIKE "+ mysql.pool.escape(req.params.totalPrice + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            for (var i = 0; i < results.length; i++)
            {
                //console.log(results[i].orderDate);
                var datestr = new Date(results[i].orderDate);

                date = JSON.stringify(datestr);
                date = date.slice(1,11);
                results[i].orderDate = date;
                //console.log(date);  
            }
            context.orders = results;
            complete();
        });
    }

    router.get('/:orderID/:customerID/:employeeID/:orderDate/:totalPrice', function(req, res){
        console.log(req.body);
        var callbackCount = 0;
        var countEmpty = 0;
        var context = {};
        //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        if (req.params.orderID == 'empty')
        {
            countEmpty++;
            req.params.orderID = '';
        }
        if (req.params.customerID == 'empty')
        {
            countEmpty++;
            req.params.customerID = '';
        }
        if (req.params.employeeID == 'empty')
        {
            countEmpty++;
            req.params.employeeID = '';
        }
        if (req.params.orderDate == 'empty')
        {
            countEmpty++;
            req.params.orderDate = '';
        }
        if (req.params.totalPrice == 'empty')
        {
            countEmpty++;
            req.params.totalPrice = '';
        }
        if (countEmpty == 5)
        {
            res.redirect('/orders');
        }
        else
        {
            getOrdersLike(req, res, mysql, context, complete);
            getCustomers(res, mysql, context, complete);
            getEmployees(res, mysql, context, complete);
            function complete(){
                callbackCount++;
                if(callbackCount >= 3){
                    res.render('orders', context);
                }

            }
        }
    });

    // /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    // router.get('/filter/:homeworld', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
    //     var mysql = req.app.get('mysql');
    //     getPeoplebyHomeworld(req,res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('people', context);
    //         }

    //     }
    // });

    // /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    // router.get('/search/:s', function(req, res){
    //     var callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
    //     var mysql = req.app.get('mysql');
    //     getPeopleWithNameLike(req, res, mysql, context, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('people', context);
    //         }
    //     }
    // });

    /* Display one person for the specific purpose of updating people */

    // router.get('/:id', function(req, res){
    //     callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["selectedplanet.js", "updateperson.js"];
    //     var mysql = req.app.get('mysql');
    //     getPerson(res, mysql, context, req.params.id, complete);
    //     getPlanets(res, mysql, context, complete);
    //     function complete(){
    //         callbackCount++;
    //         if(callbackCount >= 2){
    //             res.render('update-person', context);
    //         }

    //     }
    // });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        // console.log(req.body.homeworld)
        console.log(req.body);
        if (req.body.customerID == 'Any' || req.body.orderDate == '' || req.body.totalPrice == '')
        {
            res.redirect('/orders');
        }
        else
        {
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Orders (customerID, employeeID, orderDate, totalPrice) VALUES (?,?,?,?)";
            if (req.body.employeeID == "Any")
            {
                var inserts = [req.body.customerID, null, req.body.orderDate, req.body.totalPrice];
            }
            else
            {
                var inserts = [req.body.customerID, req.body.employeeID, req.body.orderDate, req.body.totalPrice];
            }
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/orders');
                }
            });
        }
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:orderID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        //console.log(req.params.id)
        var sql = "UPDATE Orders SET customerID=?, employeeID=?, orderDate=?, totalPrice=? WHERE orderID=?";
        var inserts = [req.body.customerID, req.body.employeeID, req.body.orderDate, req.body.totalPrice, req.params.orderID];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:orderID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Orders WHERE orderID = ?";
        var inserts = [req.params.orderID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();