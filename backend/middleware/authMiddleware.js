require("dotenv").config();
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split[" "][1];
  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.SECRET_KEY, (err, response) => {
    if (err) {
      return res.sendStatus(403);
    }
    res.locals = response;
    next();
  });
};
