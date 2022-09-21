import express from "express";
import userController from "../controllers/user.controllers.js";
const router = express.Router();
import checkUserAuth from "../middlewares/auth.js";

// ROute Level Middleware - To Protect Route
router.use("/resetpassword/:email", checkUserAuth);

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.get("/chatpage", userController.allUsers);

router.post("/addfriend", userController.addfriend);

router.get("/chatlist/:email", userController.chatList);

router.post("/resetpassword/:email", userController.resetPassword);

router.post("/editdetail", userController.editdetail);

router.get("/getcookies", (req, res) => {
  console.log(req.cookies.token);

  res.send("api working");
});

export default router;
