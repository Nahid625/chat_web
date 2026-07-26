const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getProfile,
  getAllUsers,
} = require("../controller/user_Controller");
const { authorize } = require("../middlewere/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authorize, getProfile);
router.get("/all-users", authorize, getAllUsers);
module.exports = router;
