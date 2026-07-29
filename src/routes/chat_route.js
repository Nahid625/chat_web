const express = require("express");
const router = express.Router();
const {
  createConverstation,
  getConverstation,
  sendMessage,
  getSPCmessageList,
 
} = require("../controller/chat_controller.js");
const { authorize } = require("../middlewere/authMiddleware");

router.post("/create-converstation", authorize, createConverstation);
router.get("/get-conversations", authorize, getConverstation);
router.post("/send-message", authorize, sendMessage);
// Example of how the route should look:
router.get("/messages/:conversationId", authorize, getSPCmessageList);


module.exports = router;
