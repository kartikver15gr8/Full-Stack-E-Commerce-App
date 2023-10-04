const jwt = require("jsonwebtoken");

// Admins Secret Key
const SECRET_KEY = "ILOVECODING";

// JWT Verification for Admins
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).send("Invalid Token");
      }

      req.user = user;
      next();
    });
  } else {
    res.status(411);
  }
};

module.exports = {
  SECRET_KEY,
  authenticate,
};
