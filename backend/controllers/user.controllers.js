import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ChannelModel from "../model/channel.js";

import Messages from "../model/messages.js";

dotenv.config();
class userController {
  static login = async (req, res) => {
    const { email, password } = req.body;

    // const user = await User.findOne({ email });
    // if (!user) return res.send({ message: "User not found " })
    // const valid = await bcrypt.compare(password, user.password);

    // if (valid) {
    //   const token = jwt.sign(
    //     {
    //       email: email,
    //       userID: user._id,
    //     },
    //     `${process.env.JWT_key}${user._id}`
    //   );
    //   res.send({
    //     message: "login Successfully success",
    //     user,
    //     token: token,
    //   });
    // }
    // res.send({ message: "password did't match" });

    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          // result == true
          if (result) {
            const token = jwt.sign(
              {
                email: email,
                userID: user._id,
              },
              `${process.env.JWT_key}`
            );
            res.send({
              message: "login Successfully success",
              user,
              token: token,
            });
          } else {
            res.send({ message: "password did't match", login: false });
          }
        });
      } else {
        res.send({ message: "User not found " });
      }
    });
  };
  // for signup login

  static signup = async (req, res) => {
    const { lname, fname, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      res.send({ message: "user already registered" });
    } else {
      bcrypt.hash(password, 10).then(function (hash) {
        const user = new User({
          fname,
          lname,
          email,
          password: hash,
        });
        user.save((err) => {
          if (err) {
            res.send(err);
          } else {
            res.send({ message: "successfully created" });
          }
        });
      });
    }
  };

  // for searching all friend

  static Allusers = async (req, res) => {
    const data = await User.find();
    res.send(data);
  };

  // for adding friendlist in array

  static addfriend = async (req, res) => {
    const { friend, user } = req.body;
    const { email } = user;
    let flag = true;

    // user.friend.forEach((element) => {
    //   console.log(element.email, friend.email);
    //   if (element.email === friend.email) {
    //     flag = false;
    //   }
    // });

    for (let i = 0; i < user.friend.length; i++) {
      if (friend.email == user.friend[i].email) {
        flag = false;
      }
    }

    if (flag) {
      let data = await User.findOne({ email: user.email });
      let arr = data.friend.push(friend);

      data = await User.updateOne({ email: email }, { friend: data.friend });

      res.send({ message: "api is working" });
    } else {
      res.send({ message: "friend is allready in list" });
    }
  };

  // for showing list

  static chatList = async (req, res) => {
    let { email } = req.params;

    const data = await User.findOne({ email: email });
    res.send(data);
  };

  // for reset password

  static resetPassword = async (req, res) => {
    let data = await User.findOne({ email: req.params.email });

    bcrypt.compare(req.body.old, data.password, function (err, result) {
      if (result) {
        bcrypt.hash(req.body.newP, 10).then(async function (hash) {
          data.password = hash;

          await User.updateOne({ email: req.params.email }, data);

          res.send("password updated successfuly");
        });
      } else {
        res.send("wrong old password");
      }
    });
  };

  // for editing logged user detailing

  static editdetail = async (req, res) => {
    const { lname, fname } = req.body.changes;

    const user = await User.updateOne(
      { _id: req.body.id },
      { $set: { lname: lname, fname: fname } }
    );

    res.send("edit api");
  };

  // getting logged user

  static loggeduser = async (req, res) => {
    res.send(req.user);
  };

  // for making chat connection

  static makingChatConnection = async (req, res) => {
    const id = req.user._id;
    const id2 = req.body.fid;

    const channelConnection = await ChannelModel.findOne({
      $or: [
        { user1: id, user2: id2 },
        { user1: id2, user2: id },
      ],
    });

    if (!channelConnection) {
      const newadd = new ChannelModel({ user1: id, user2: id2 });
      await newadd.save();
      res.send("api is working");
    } else {
      res.send("allready in friend list");
    }
  };

  //for showing friend list

  static showingChatList = async (req, res) => {
    const id = req.user._id;

    let reqSend = await ChannelModel.find({ user1: id })
      .populate("user2")
      .select("-user1");
    let reqRecieved = await ChannelModel.find({ user2: id })
      .populate("user1")
      .select("user1");

    const chatlist = [];

    for (let i = 0; i < reqSend.length; i++) {
      let obj = { ...reqSend[i].user2._doc };
      obj.conversationId = reqSend[i]._id;
      console.log(obj);

      chatlist.push(obj);
    }
    for (let i = 0; i < reqRecieved.length; i++) {
      let obj = { ...reqRecieved[i].user1._doc };
      obj.conversationId = reqRecieved[i]._id;
      console.log(obj);
      chatlist.push(obj);
    }
    res.send(chatlist);
  };

  // for making message connection

  static messageConnection = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.body.receiverId;

    const channelConnection = await ChannelModel.findOne({
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    });

    let messageconnection = await Messages.findOne({
      senderId: senderId,
      receiverId: receiverId,
    });

    if (messageconnection) {
      res.send(messageconnection);
    } else {
      messageconnection = await new Messages({
        senderId: senderId,
        receiverId: receiverId,
        chatConnectionId: channelConnection._id,
      }).save();
      res.send(messageconnection);
    }
  };

  // finding conversation id
  static conversationId = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;

    try {
      const conversation = await ChannelModel.findOne({
        $or: [
          { user1: senderId, user2: receiverId },
          { user1: receiverId, user2: senderId },
        ],
      });
      res.status(200).send(conversation);
    } catch (err) {
      res.status(500).send(err);
    }
  };
  // for sending messages

  static messagessend = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.body.receiverId;
    const chatConnectionId = req.body.chatConnectionId;
    const messages = req.body.messages;

    // const channelConnection = await ChannelModel.findOne({
    //   $or: [
    //     { user1: senderId, user2: receiverId },
    //     { user1: receiverId, user2: senderId },
    //   ],
    // });

    if (messages !== "") {
      const data = new Messages({
        senderId: senderId,
        receiverId: receiverId,
        chatConnectionId: chatConnectionId,
        messages: messages,
      });

      await data.save();
      res.send("send successfuly");
    } else res.send("empty messages");
  };

  // for geting messsages

  static messagesget = async (req, res) => {
    const senderId = req.user._id;
    const receiverId = req.params.receiverId;

    const getConnectionId = await ChannelModel.findOne({
      $or: [
        { user1: senderId, user2: receiverId },
        { user1: receiverId, user2: senderId },
      ],
    });

    const allConversation = await Messages.find({
      chatConnectionId: getConnectionId._id,
    });

    // let sendMessages = [];
    // let receiveMessage = [];

    // for (let i = 0; i < allConversation.length; i++) {
    //   let msg;

    //   if (
    //     JSON.stringify(allConversation[i].senderId) == JSON.stringify(senderId)
    //   ) {
    //     msg = allConversation[i].messages;

    //     console.log(msg);
    //     sendMessages.push(msg);
    //   } else {
    //     if (
    //       JSON.stringify(allConversation[i].receiverId) ==
    //       JSON.stringify(senderId)
    //     )
    //       msg = allConversation[i].messages;

    //     receiveMessage.push(msg);
    //     console.log(msg);
    //   }
    // }
    // res.send({ sendMessages: sendMessages, receiveMessage: receiveMessage });

    res.status(200).send(allConversation);
  };
}

export default userController;
