const user = require("../models/userModel");
const messageModel = require("../models/msgModel");
const fetchAllMsgs = async (req, res, next) => {
  const { senderName, receiverName } = req.body;
  const messages = await messageModel
    .find({
      $or: [
        {
          sender: senderName,
          receiver: receiverName,
        },
        { sender: receiverName, receiver: senderName },
      ],
    })
    .sort({ createdAt: "asc" });
  return res.json({ info: messages, status: true });
};
const fetchReceiver = async (req, res, next) => {
  const { receiver } = req.body;
  const receiverInfo = await user
    .findOne({ username: receiver })
    .select("-password");
  return res.json({ info: receiverInfo, status: true });
};
const createMessage = async (req, res, next) => {
  try {
    const { msg, senderName, receiverName } = req.body;
    const messageInfo = await messageModel.create({
      message: msg,
      sender: senderName,
      receiver: receiverName,
    });
    return res.json({ info: messageInfo, status: true });
  } catch (error) {
    next(error);
  }
};
module.exports = { fetchAllMsgs, fetchReceiver, createMessage };
