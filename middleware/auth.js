import jwt from "jsonwebtoken";

const config = process.env;

export const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    res.user = decoded;
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
  return next();
};
