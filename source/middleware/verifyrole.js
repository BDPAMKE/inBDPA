const jwt = require("jsonwebtoken");

//const config = process.env;

const verifyRole = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || global.userToken;

  if (!token) {
    res.locals.role="public";
    return "public";
  }
  try {
    const decoded = jwt.verify(token, process.env.BEARER_TOKEN);
    req.user = decoded;
    return req.user.role;
  } 
  catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

module.exports = verifyRole;