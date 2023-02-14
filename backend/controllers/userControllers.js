const connection = require("../config/dbConnection");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

// Get all user
const getUserController = (req, res) => {
  const userQuery =
    "select id,name,email,contactNumber, status from users where role='user'";
  connection.query(userQuery, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
};

module.exports = {
  getUserController,
};
