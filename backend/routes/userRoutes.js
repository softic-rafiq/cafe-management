const express = require("express");
const router = express.Router();
const connection = require("../config/dbConnection");

router.post("/signup", (req, res) => {
  let user = req.body;
  const userQuery =
    "select email,password,role,status from users where email=?";
  connection.query(userQuery, [user.email], (err, results) => {
    if (!err) {
      // return res.json(results);
      if (results.length <= 0) {
        insertQuery =
          "insert into users(name,contactNumber,email,password,status,role) values(?,?,?,?,'false','user')";
        connection.query(
          insertQuery,
          [user.name, user.contactNumber, user.email, user.password],
          (err, results) => {
            if (!err) {
              return res.status(201).json({
                message: "User registration successfull",
              });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({
          message: "Email already exist",
        });
      }
      // console.log("Get all user", results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/", (req, res) => {
  const userQuery = "select * from users";
  connection.query(userQuery, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
module.exports = router;
