const express = require("express");
const { postLogin, postLogout, postSignup } = require("../controllers/auth");

const router = express.Router();

router.post("/login", postLogin);
router.post("/logout", postLogout);
router.post("/signup", postSignup);

module.exports = { router };
