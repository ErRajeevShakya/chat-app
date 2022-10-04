import express from "express";
import cors from "cors";
import UserModel from "./model/userModel.js";
import user from "./routes/user.js";
import DBconnect from "./config/DBconnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Messages from "./model/messages.js";
import { createServer } from "http";
import { Server } from "socket.io";
import FriendList from "./model/channel.js";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

DBconnect("mongodb://localhost:27017");

app.use("/", user);

let rooms = [];
const httpServer = createServer(app);
const io = new Server(httpServer);
// const users = [];
io.on("connection", function (socket) {
  //joining room

  socket.on("join-room", async (room) => {
    console.log(room, "dsfljdl");
    socket.join(room);

    // if (user) {
    //   users.push(room);
    // }

    // if (!Boolean(users.indexOf(room) + 1)) {
    //   users.push(room);
    // }
    // const oldMessage = await Messages.find({ chatConnectionId: room });
    // socket.to(room).emit("oldMessage", oldMessage);
  });

  // sending and receiving messages

  socket.on("sendMessage", async (msg) => {
    // socket.broadcast.to(msg.chatConnectionId).emit("receiveMessage", msg);
    // socket.to(msg.chatConnectionId).emit("receiveMessage", msg);
    socket.to(msg.receiverId).emit("receiveMessage", msg);

    try {
      const newSms = new Messages(msg);
      await newSms.save();
      console.log(msg.chatConnectionId, "dslfhksjdf");
    } catch (err) {
      console.log(err);
    }
  });

  // send all users
  const sendUser = async () => {
    return await UserModel.find();
  };
  socket.emit("getallusers", sendUser());

  // send friendList corresponding specific user
  // const sendshowfriendlist = async (id) => {
  //   const reqSend = await FriendList.find({ user1: id }).populate("user2");
  // };
});

httpServer.listen(5000, () => {
  console.log("Be started at port 5000");
});
