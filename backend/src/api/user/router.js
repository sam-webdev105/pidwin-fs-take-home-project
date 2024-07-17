import express from "express";
import login from "./login.js";
import signup from "./signup.js";
import changePassword from "./change-password.js";
import auth from "../../utils/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/changePassword", auth, changePassword);

export default router;
