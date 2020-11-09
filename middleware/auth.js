const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const decodedToken = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Invalid Data");
  }
}

module.exports.auth = auth;
