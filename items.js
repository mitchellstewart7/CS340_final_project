module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getItems(res, mysql, context, complete){
        mysql.pool.query("SELECT itemID, itemName, departmentNumber, numberInStock, optimalStock, price FROM Items", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.items = results;
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
        getItems(res, mysql, context, complete);
        //getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('items', context);
            }

        }
    });

    function getItemsLike(req, res, mysql, context, complete) {
        //sanitize the input as well as include the % character
          var query = "SELECT itemID, itemName, departmentNumber, numberInStock, optimalStock, price FROM Items WHERE itemID LIKE " + mysql.pool.escape(req.params.itemID + '%') + "AND itemName LIKE " + mysql.pool.escape(req.params.itemName + '%') + "AND departmentNumber LIKE "+ mysql.pool.escape(req.params.departmentNumber + '%') + "AND numberInStock LIKE "+ mysql.pool.escape(req.params.numberInStock + '%') + "AND optimalStock LIKE "+ mysql.pool.escape(req.params.optimalStock + '%') + "AND price LIKE "+ mysql.pool.escape(req.params.price + '%');
        console.log(query)
  
        mysql.pool.query(query, function(error, results, fields){
              if(error){
                  res.write(JSON.stringify(error));
                  res.end();
              }
              context.items = results;
              complete();
          });
      }
  
      router.get('/:itemID/:itemName/:departmentNumber/:numberInStock/:optimalStock/:price', function(req, res){
          console.log(req.body);
          var callbackCount = 0;
          var countEmpty = 0;
          var context = {};
          //context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
          var mysql = req.app.get('mysql');
          if (req.params.itemID == 'empty')
          {
              countEmpty++;
              req.params.itemID = '';
          }
          if (req.params.itemName == 'empty')
          {
              countEmpty++;
              req.params.itemName = '';
          }
          if (req.params.departmentNumber == 'empty')
          {
              countEmpty++;
              req.params.departmentNumber = '';
          }
          if (req.params.numberInStock == 'empty')
          {
              countEmpty++;
              req.params.numberInStock = '';
          }
          if (req.params.optimalStock == 'empty')
          {
              countEmpty++;
              req.params.optimalStock = '';
          }
          if (req.params.price == 'empty')
          {
              countEmpty++;
              req.params.price = '';
          }
          if (countEmpty == 6)
          {
              res.redirect('/items');
          }
          else
          {
              getItemsLike(req, res, mysql, context, complete);
              //getPlanets(res, mysql, context, complete);
              function complete(){
                  callbackCount++;
                  if(callbackCount >= 1){
                      res.render('items', context);
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
        if (req.body.itemName == '' || req.body.departmentNumber == '' || req.body.numberInStock == '' || req.body.optimalStock == '' || req.body.price == '')
        {
            res.redirect('/items');
        }
        else
        {
            var mysql = req.app.get('mysql');
            var sql = "INSERT INTO Items (itemName, departmentNumber, numberInStock, optimalStock, price) VALUES (?,?,?,?,?)";
            var inserts = [req.body.itemName, req.body.departmentNumber, req.body.numberInStock, req.body.optimalStock, req.body.price];
            sql = mysql.pool.query(sql,inserts,function(error, results, fields){
                if(error){
                    console.log(JSON.stringify(error))
                    res.write(JSON.stringify(error));
                    res.end();
                }else{
                    res.redirect('/items');
                }
            });
        }
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:itemID', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        //console.log(req.params.id)
        var sql = "UPDATE Items SET itemName=?, departmentNumber=?, numberInStock=?, optimalStock=?, price=? WHERE itemID=?";
        var inserts = [req.body.itemName, req.body.departmentNumber, req.body.numberInStock, req.body.optimalStock, req.body.price, req.params.itemID];
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

    router.delete('/:itemID', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM Items WHERE itemID = ?";
        var inserts = [req.params.itemID];
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