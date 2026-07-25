const express = require("express");
const router = express.Router();
const {
  createConverstation,
  getConverstation,
} = require("../controller/chat_controller.js");
const { authorize } = require("../middlewere/authMiddleware");

router.post("/create-converstation", authorize, createConverstation);
router.get("/conversations", authorize, getConverstation);
module.exports = router;
