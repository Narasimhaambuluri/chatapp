const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/msgRoutes");
const socket = require("socket.io");

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    const ref = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database");
  } catch (error) {
    console.log(`Error connecting to database ${error}`);
  }
};
connect();

app.use("/api/user/", userRoutes);
app.use("/api/chat/", msgRoutes);

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});
global.onlineUsers = new Map();

io.on("connection", (socket) => {
  socket.on("add-user", (username) => {
    onlineUsers.set(username, socket.id);
  });
  socket.on("send-msg", (data) => {
    const receiverSocketId = onlineUsers.get(data.to);
    console.log(receiverSocketId);
    if (receiverSocketId) {
      socket.to(receiverSocketId).emit("receive-msg", data.msg);
      console.log("hello");
    }
  });
});
