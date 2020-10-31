const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "eephus_db"
});

connection.connect();



module.exports = connection;