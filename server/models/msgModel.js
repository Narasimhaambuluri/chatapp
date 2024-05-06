const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;
