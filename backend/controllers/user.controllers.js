import { FloatingLabel } from "react-bootstrap";
import User from "../model/userModel.js";
class userController {
  static login = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        res.send({ message: "login Successfully success", user });
      } else {
        res.send({ message: "User not found " });
      }
    });
  };

  static signup = async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      res.send({ message: "user already registered" });
    } else {
      const user = new User({
        name,
        email,
      });
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.send({ message: "successfully created" });
        }
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
    user.friend.forEach((element) => {
      console.log(element.email, friend.email);
      if (element.email === friend.email) {
        flag = false;
      }
    });
    // for(let i = 1; i<)
    let check = await User.findOne({ email: user.friend.email });
    console.log(check);

    if (flag) {
      let data = await User.findOne({ email: user.email });
      let arr = data.friend.push(friend);
      console.log(data.friend);
      data = await User.updateOne({ email: email }, { friend: data.friend });
      console.log(data);
      res.send({ message: "api is working" });
    } else {
      res.send({ message: "friend is allready in list" });
    }
  };
}

export default userController;
