import express from "express";
import cors from "cors";

import user from "./routes/user.js";
import DBconnect from "./config/DBconnect.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import SocketModel from "./model/socketModel.js";

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

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", function (socket) {
  io.of("/").adapter.on("create-room", (room) => {
    console.log(`room ${room} was created`);
  });

  io.of("/").adapter.on("join-room", (room, id) => {
    console.log(`socket ${id} has joined room ${room}`);
  });

  // socket.on("send", (msg) => {
  //   console.log("A user connected");
  //   socket.emit("message", msg);
  // });
  // socket.on("disconnect", function () {
  //   console.log("A user disconnected");
  // });
});

httpServer.listen(5000, () => {
  console.log("Be started at port 5000");
});
