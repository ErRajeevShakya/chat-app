import { FloatingLabel } from "react-bootstrap";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
class userController {
  static login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (err, result) {
          // result == true
          if (result) {
            const token = jwt.sign(
              {
                email: email,
                id: user._id,
              },
              "rajeevkumar123",
              { expiresIn: "1h" }
            );
            res.send({
              message: "login Successfully success",
              user,
              token: token,
            });
          } else {
            res.send({ message: "password did't match" });
          }
        });
      } else {
        res.send({ message: "User not found " });
      }
    });
  };

  static signup = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      res.send({ message: "user already registered" });
    } else {
      bcrypt.hash(password, 10).then(function (hash) {
        const user = new User({
          name,
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
    console.log(req.body);
  };

  static allUsers = async (req, res) => {
    const data = await User.find();
    res.send(data);
  };
  static addfriend = async (req, res) => {
    // console.log(req.body);
    const { friend, user } = req.body;
    const { email } = user;
    let flag = true;

    console.log(friend.email, user.friend.length);
    // user.friend.forEach((element) => {
    //   console.log(element.email, friend.email);
    //   if (element.email === friend.email) {
    //     flag = false;
    //   }
    // });

    for (let i = 0; i < user.friend.length; i++) {
      if (friend.email == user.friend[i].email) {
        console.log(friend.email, user.friend[i].email);
        flag = false;
      }
    }
    console.log(flag);
    if (flag) {
      let data = await User.findOne({ email: user.email });
      let arr = data.friend.push(friend);

      data = await User.updateOne({ email: email }, { friend: data.friend });

      res.send({ message: "api is working" });
    } else {
      res.send({ message: "friend is allready in list" });
    }
  };

  static chatList = async (req, res) => {
    let email = req.params;
    console.log(email);
    const data = await User.findOne({ email: email });
    console.log(data);
    if (data) {
      res.send({ data: data });
    } else {
      res.send({ message: "not found!" });
    }
  };

  static resetPassword = async (req, res) => {
    console.log(req.params);
    let data = await User.findOne({ email: req.params.email });
    console.log(req.body);
    console.log(data);
    if (data.password == req.body.old) {
      data.password = req.body.newP;
      console.log(data.password);
      console.log(data);
      let update = await User.updateOne({ email: req.params.email }, data);

      res.send("password updated successfuly");
    } else {
      res.send("wrong old password");
    }
  };
}

export default userController;
