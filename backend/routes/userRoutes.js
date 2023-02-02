const express = require("express");
const router = express.Router();
const connection = require("../config/dbConnection");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

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

router.post("/login", (req, res) => {
  const user = req.body;
  const userQuery = "select * from users where email=?";

  connection.query(userQuery, [user.email], (err, results) => {
    // console.log(results);
    if (!err) {
      if (results.length <= 0 || results[0].password != user.password) {
        return res.status(401).json({
          message: "Incorrect username or password",
        });
      } else if (results[0].status === "false") {
        return res.status(401).json({
          message: "Wait for Admin Approval",
        });
      } else if (results[0].password === user.password) {
        const userData = {};
        const response = {
          email: results[0].email,
          role: results[0].role,
          name: results[0].name,
        };
        const accessToken = jwt.sign(response, process.env.SECRET_KEY, {
          expiresIn: "1d",
        });

        res.status(200).json({
          user: ({ name, email, contactNumber, role, status } = results[0]),
          accessToken: accessToken,
        });
      } else {
        return res.status(401).json({
          message: "Something went wrong!",
        });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/forgot-password", (req, res) => {
  let user = req.body;
  const userQuery = "select email,password from users where email=?";
  connection.query(userQuery, [user.email], (err, results) => {
    if (!err) {
      // return res.json(results);
      if (results.length <= 0) {
        return res.status(200).json({
          message: "Password sent successfully to your email",
        });
      } else {
        var transporter = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "d7c477a57e8c06",
            pass: "c4106e04395503",
          },
        });

        var mailOptions = {
          from: "rafiq@softic.ai",
          to: results[0].email,
          subject: "Password by Cafe Management System",
          html:
            "<p><b>Your login details for Cafe Management System</b><br><b>Email:</b>:" +
            results[0].email +
            "<br><b>Password:</b>:" +
            results[0].password +
            "<br></p><p><a href='http://localhost:8080/users/login'>Click this link to login</a></p>",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        return res.status(200).json({
          message: "Password sent successfully to your email",
        });
      }
      // console.log("Get all user", results);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
