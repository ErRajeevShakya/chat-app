import express from "express";
import userController from "../controllers/user.controllers.js";
const router = express.Router();

router.post("/login", userController.login);

router.post("/signup", userController.signup);

router.get("/chatpage", userController.allUsers);

router.post("/addfriend", userController.addfriend);
export default router;
