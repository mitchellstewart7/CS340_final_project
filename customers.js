module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT customerID, firstName, lastName, email, phoneNumber, areaCode, accountStartDate FROM Customers", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            for (var i = 0; i < results.length; i++)
            {
                //console.log(results[i].orderDate);
                var datestr = new Date(results[i].accountStartDate);

                date = JSON.stringify(datestr);
                date = date.slice(1,11);
                results[i].accountStartDate = date;
                //console.log(date);  
            }
            context.customers = results;
            complete();
        });
    }

    // function getPeople(res, mysql, context, complete){
    //     mysql.pool.query("SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.people = results;
    //         complete();
    //     });
    // }

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
        getCustomers(res, mysql, context, complete);
        //getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('customers', context);
            }

        }
    });

    function getCustomersLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
          var query = "SELECT customerID, firstName, lastName, email, phoneNumber, areaCode, accountStartDate FROM Customers WHERE customerID LIKE " + mysql.pool.escape(req.params.customerID + '%') + "AND firstName LIKE " + mysql.pool.escape(req.params.firstName + '%') + "AND lastName LIKE "+ mysql.pool.escape(req.params.lastName + '%') + "AND email LIKE "+ mysql.pool.escape(req.params.email + '%') + "AND phoneNumber LIKE "+ mysql.pool.escape(req.params.phoneNumber + '%') + "AND areaCode LIKE "+ mysql.pool.escape(req.params.areaCode + '%') + "AND accountStartDate LIKE "+ mysql.pool.escape(req.params.accountStartDate + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              for (var i = 0; i < results.length; i++)
              {
                  //console.log(results[i].orderDate);
                  var datestr = new Date(results[i].accountStartDate);
  
                  date = JSON.stringify(datestr);
                  date = date.slice(1,11);
                  results[i].accountStartDate = date;
                  //console.log(date);  
              }
              context.customers = results;
              complete();
          });
      }
  
      router.get('/:customerID/:firstName/:lastName/:email/:phoneNumber/:areaCode/:accountStartDate', function(req, res){
          console.log(req.body);
          var callbackCount = 0;
          var countEmpty = 0;
          var context = {};
          //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
          var mysql = req.app.get('mysql');
          if (req.params.customerID == 'empty')
          {
              countEmpty++;
              req.params.customerID = '';
          }
          if (req.params.firstName == 'empty')
          {
              countEmpty++;
              req.params.firstName = '';
          }
          if (req.params.lastName == 'empty')
          {
              countEmpty++;
              req.params.lastName = '';
          }
          if (req.params.email == 'empty')
          {
              countEmpty++;
              req.params.email = '';
          }
          if (req.params.phoneNumber == 'empty')
          {
              countEmpty++;
              req.params.phoneNumber = '';
          }
          if (req.params.areaCode == 'empty')
          {
              countEmpty++;
              req.params.areaCode = '';
          }
          if (req.params.accountStartDate == 'empty')
          {
              countEmpty++;
              req.params.accountStartDate = '';
          }
          if (countEmpty == 7)
          {
              res.redirect('/customers');
          }
          else
          {
              getCustomersLike(req, res, mysql, context, complete);
              //getPlanets(res, mysql, context, complete);
              function complete(){
                  callbackCount++;
                  if(callbackCount >= 1){
                      res.render('customers', context);
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
        if (req.body.firstName == '' || req.body.lastName == '' || req.body.email == '' || req.body.accountStartDate == '')
        {
            res.redirect('/customers');
        }
        else
        {
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Customers (firstName, lastName, email, phoneNumber, areaCode, accountStartDate) VALUES (?,?,?,?,?,?)";
            if (req.body.phoneNumber == '' && req.body.areaCode == '')
            {
                var inserts = [req.body.firstName, req.body.lastName, req.body.email, null, null, req.body.accountStartDate];
            }
            else if (req.body.phoneNumber == '')
            {
                var inserts = [req.body.firstName, req.body.lastName, req.body.email, null, req.body.areaCode, req.body.accountStartDate];
            }
            else if (req.body.areaCode == '')
            {
                var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, null, req.body.accountStartDate];
            }
            else
            {
                var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.areaCode, req.body.accountStartDate];
            }
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/customers');
                }
            });
        }
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:customerID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        //console.log(req.params.id)
        var sql = "UPDATE Customers SET firstName=?, lastName=?, email=?, phoneNumber=?, areaCode=?, accountStartDate=? WHERE customerID=?";
        var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.phoneNumber, req.body.areaCode, req.body.accountStartDate, req.params.customerID];
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

    router.delete('/:customerID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Customers WHERE customerID = ?";
        var inserts = [req.params.customerID];
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