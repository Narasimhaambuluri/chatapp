const express = require("express");
const router = express.Router();
const {
  fetchReceiver,
  createMessage,
  fetchAllMsgs,
} = require("../controllers/msgControllers");

router.post("/fetchreceiverInfo", fetchReceiver);
router.post("/createmsg", createMessage);
router.post("/fetchallmsgs", fetchAllMsgs);

module.exports = router;
