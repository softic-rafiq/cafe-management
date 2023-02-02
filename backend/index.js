const express = require("express");
const cors = require("cors");
const connection = require("./config/dbConnection");
// const createUser = require("./table/user");

// import routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// const createUser =
//   "CREATE TABLE users( id int primary key AUTO_INCREMENT,name varchar(250),contactNumber varchar(20),email varchar(50),password varchar(250),status varchar(20), role varchar(20), UNIQUE(email))";
// connection.query(createUser, function (err, results, fields) {
//   if (err) {
//     console.log(err.message);
//   } else {
//     console.log("table created success");
//   }
// });

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", userRoutes);

module.exports = app;