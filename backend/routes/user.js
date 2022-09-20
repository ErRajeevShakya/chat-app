import express from "express";
import userController from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.get("/chatpage", userController.allUsers);

router.post("/addfriend", userController.addfriend);

router.post("/chatlist/:email", userController.chatList);

router.post("/resetpassword/:email", userController.resetPassword);

export default router;
