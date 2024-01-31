const express = require("express");
const {
  postLogin,
  postLogout,
  postSignup,
  postReset,
  getResetToken,
  postNewPassword,
} = require("../controllers/auth");

const router = express.Router();

router.post("/login", postLogin);
router.post("/logout", postLogout);
router.post("/signup", postSignup);
router.post("/reset", postReset);
router.get("/reset/:token", getResetToken);
router.post("/new-password", postNewPassword);

module.exports = { router };
