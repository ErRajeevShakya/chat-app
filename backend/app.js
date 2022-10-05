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
import { send } from "process";

dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

DBconnect("mongodb://localhost:27017");

app.use("/", user);

const httpServer = createServer(app);
const io = new Server(httpServer);
// const users = [];
io.on("connection", function (socket) {
  //joining room

  socket.on("join-room", async (room) => {
    console.log(room);
    socket.join(room);

    // if (user) {
    //   users.push(room);
    // }

    // if (!Boolean(users.indexOf(room) + 1)) {
    //   users.push(room);
    // }
    let oldMsg = await Messages.find({ chatConnectionId: room });
    socket.to(room).emit("oldMessage", oldMsg);
  });

  // sending and receiving messages

  socket.on("sendMessage", async (msg) => {
    // socket.broadcast.to(msg.chatConnectionId).emit("receiveMessage", msg);
    // socket.to(msg.receiverId).emit("receiveMessage", msg);

    try {
      const newSms = new Messages(msg);
      await newSms.save();
      let all = await Messages.find({ chatConnectionId: msg.chatConnectionId });
      socket.to(msg.chatConnectionId).emit("receiveMessage", all);
    } catch (err) {
      console.log(err);
    }
  });

  // send all users

  socket.on("getUsers", async (a) => {
    const users = await UserModel.find();
    // console.log(users);
    socket.emit("setAllusers", users);
  });

  // send friendList corresponding specific user

  socket.on("getfriendlist", async (id) => {
    // console.log(id, "ijdiosif");
    let reqSend = await FriendList.find({ user1: id })
      .populate("user2")
      .select("-user1");
    let reqRecieved = await FriendList.find({ user2: id })
      .populate("user1")
      .select("-user2");
    const chatlist = [];
    for (let i = 0; i < reqSend.length; i++) {
      let obj = { ...reqSend[i].user2._doc };
      obj.conversationId = reqSend[i]._id;
      chatlist.push(obj);
    }
    for (let i = 0; i < reqRecieved.length; i++) {
      let obj = { ...reqRecieved[i].user1._doc };
      obj.conversationId = reqRecieved[i]._id;
      chatlist.push(obj);
    }
    // console.log(chatlist);
    socket.emit("showingfrindlist", chatlist);
  });
});

httpServer.listen(5000, () => {
  console.log("Be started at port 5000");
});
