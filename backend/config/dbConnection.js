const mysql = require("mysql");
require("dotenv").config();

var connection = mysql.createConnection({
  port: "3306",
  host: "localhost",
  user: "root",
  password: "",
  database: "cafe_management",
});

connection.connect((err) => {
  if (!err) {
    console.log("Connect database");
  } else {
    console.log("Err", err);
  }
});

module.exports = connection;
