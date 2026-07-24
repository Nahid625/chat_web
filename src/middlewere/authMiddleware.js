const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET environment variable is required");
}

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, jwtSecret);
    req.user = {
      id: payload.userId,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Double check that 'authorize' is spelled identically here
module.exports = {
  authorize,
};