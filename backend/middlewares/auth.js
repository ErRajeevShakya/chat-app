import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

var checkUserAuth = async (req, res, next) => {
  console.log(req.params);
  let token;
  const data = await User.findOne({ email: req.params.email });
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token from header
      token = authorization.split(" ")[1];
      console.log(token);

      // Verify Token
      const { userID } = jwt.verify(token, `${process.env.JWT_key}${data._id}`);

      // Get User from Token
      req.user = await User.findById(userID).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "failed", message: "Unauthorized User, No Token" });
  }
};

export default checkUserAuth;
