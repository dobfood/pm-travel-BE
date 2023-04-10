import express from "express";
import passport from "passport";
import { register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
const router = express.Router();

const successLoginUrl = "http://localhost:5001/login/success";
const errorLoginUrl = "http://localhost:5001/login/error";
// sign google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Can not login to Google ,please try later!",
    failureRedirect: errorLoginUrl,
    successRedirect: successLoginUrl,
  })
);

//sign wed app
router.post("/register", register);
router.post("/login", login);
export default router;
