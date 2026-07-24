const express = require("express");
const router = express.Router();
const { createConverstation } = require("../controller/chat_controller.js");
const { authorize } = require("../middlewere/authMiddleware");

router.post("/create-converstation", authorize, createConverstation);
module.exports = router;
