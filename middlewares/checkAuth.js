const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) throw "Forbidden!!";
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_JWT);
    req.user = payload;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Authorized Failed",
      error,
    });
  }
};