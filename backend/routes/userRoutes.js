const express = require("express");
const router = express.Router();
const connection = require("../config/dbConnection");

router.get("/", (req, res) => {
  const userQuery = "select * from users";
  connection.query(userQuery, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    } else {
      return res.json(results);
      console.log("Get all user", results);
    }
  });
});

module.exports = router;
