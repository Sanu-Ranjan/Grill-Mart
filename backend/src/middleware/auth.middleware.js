const jwt = require("jsonwebtoken");
const { failure } = require("../utils/response");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(failure("Unauthorized : token missing"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res
      .status(401)
      .json(failure("Unauthorized : invalid or expired token"));
  }
};

module.exports = {
  verifyToken,
};
