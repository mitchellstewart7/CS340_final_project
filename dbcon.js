var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_stewamit',
  password        : '1448',
  database        : 'cs340_stewamit'
});
module.exports.pool = pool;