const express = require("express");
const router = express.Router();
const { signup, login, getProfile } = require("../controller/user_Controller");
const { authorize } = require("../middlewere/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authorize, getProfile);

module.exports = router;
