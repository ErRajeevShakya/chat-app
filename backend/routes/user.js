import express from "express";
import userController from "../controllers/user.controllers.js";
const router = express.Router();
import checkUserAuth from "../middlewares/auth.js";

// ROute Level Middleware - To Protect Route
router.use("/resetpassword", checkUserAuth);
router.use("/loggeduser", checkUserAuth);
router.use("/makingChatConnection", checkUserAuth);
router.use("/showingChatList", checkUserAuth);
router.use("/messageconnection", checkUserAuth);
router.use("/messagessend", checkUserAuth);
router.use("/messagesget", checkUserAuth);
router.use("/conversationid", checkUserAuth);

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.get("/Allusers", userController.Allusers);

router.post("/addfriend", userController.addfriend);

router.get("/chatlist/:email", userController.chatList);

router.post("/resetpassword/:email", userController.resetPassword);

router.post("/editdetail", userController.editdetail);

router.get("/loggeduser", userController.loggeduser);

router.post("/makingChatConnection", userController.makingChatConnection);
router.get("/showingChatList", userController.showingChatList);
router.post("/messageconnection", userController.messageConnection);
router.post("/messagessend", userController.messagessend);
router.get("/messagesget/:receiverId", userController.messagesget);
router.get("/conversationid/:receiverId", userController.conversationId);

router.get("/getcookies", (req, res) => {
  console.log(req.cookies.token);

  res.send("api working");
});

export default router;
