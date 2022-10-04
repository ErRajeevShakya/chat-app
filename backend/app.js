import express from "express";
import cors from "cors";

import user from "./routes/user.js";
import DBconnect from "./config/DBconnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Messages from "./model/messages.js";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

DBconnect("mongodb://localhost:27017");

app.use("/", user);
let rooms;
const httpServer = createServer(app);
const io = new Server(httpServer);
const users = [];
io.on("connection", function (socket) {
  socket.on("join-room", async (room) => {
    console.log(room);
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
  socket.on("sendMessage", async (msg) => {
    // socket.to(msg.chatConnectionId).emit("receiveMessage", msg);
    socket.to(msg.receiverId).emit("receiveMessage", msg);

    try {
      const newSms = new Messages(msg);
      await newSms.save();
      console.log(msg);
    } catch (err) {
      console.log(err);
    }
  });
});

httpServer.listen(5000, () => {
  console.log("Be started at port 5000");
});
