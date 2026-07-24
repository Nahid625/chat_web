const jwt = require("jsonwebtoken");

const createToken = (user, jwtSecret) => {
  return jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: "1h" },
  );
};

module.exports = {
  createToken,
};
