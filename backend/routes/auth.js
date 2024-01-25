const express = require("express");
const { postLogin, postLogout } = require("../controllers/auth");

const router = express.Router();

router.post("/login", postLogin);
router.post("/logout", postLogout);

module.exports = { router };
