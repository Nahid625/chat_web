const jwt = require("jsonwebtoken");

const createToken = (user, jwtSecret) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: "24h" },
  );
};

module.exports = {
  createToken,
};
