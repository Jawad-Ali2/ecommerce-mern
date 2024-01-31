const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

exports.postLogin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        throw new Error("User doesn't exists");
      }

      bcrypt.compare(password, user.password).then((passMatch) => {
        if (passMatch) {
          req.session.loggedIn = true;
          req.session.user = {
            _id: user._id.toString(),
            email: user.email,
            password: user.password,
          };
          return req.session.save((err) => {
            if (err) {
              throw new Error("Error saving the session");
            } else {
              res.status(200).json({ message: "Logged in successfully" });
            }
          });
        }
        res.status(400).json({ message: "Wrong Credentials" });
      });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

exports.postLogout = (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    console.log(err);
    // res.cookie("CSRF-TOKEN", { expires: new Date(0) });
    res.clearCookie("CSRF-TOKEN");
    res.clearCookie("_csrf");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

exports.postSignup = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  if (password === confirmPassword) {
    User.findOne({ email: email })
      .then((existingUser) => {
        if (existingUser) {
          // return res
          throw new Error("User with this mail aready exists");
          //   .status(400)
          //   .json({ message: "User with this mail already exists" });
        }

        return bcrypt.hash(password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          email: email,
          password: hashedPassword,
          cart: { items: [] },
        });

        return user.save();
      })
      .then(() => {
        res.status(201).json({ message: "User Created" });
        transporter
          .sendMail({
            to: email,
            from: "jawadali66667@gmail.com",
            subject: "Welcome to Shop",
            text: "Welcome to Shop",
            html: "<h1>You Successfully Signed Up!</h1>",
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        if ((err.message = "User with this mail aready exists")) {
          res.status(400).json({ message: err.message });
        } else {
          res.status(500).json({ message: err });
        }
      });
  }

  // return res.status(500).json({ message: "Password does not match" });

  // ....
};

exports.postReset = (req, res, next) => {
  const email = req.body.email;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.status(500).json({ message: err.message });
    }
    const token = buffer.toString("hex");

    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          throw new Error("User doesn't exists");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; // 1 hour
        return user.save();
      })
      .then(() => {
        transporter
          .sendMail({
            to: email,
            from: "jawadali66667@gmail.com",
            subject: "Password Reset Request",
            // text: "Reset Password",
            html: `
            <h1>Password Reset Request</h1>
            <p>Please click <a href="http://localhost:5173/reset/${token}">here</a> to reset your password.</p>
            `,
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(200).json({ message: "Password reset request sent" });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  });
};

exports.getResetToken = (req, res) => {
  const token = req.params.token;
  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        throw new Error("Password reset token is invalid or has expired");
      }
      res.status(200).send({ userId: user._id.toString() });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.postNewPassword = (req, res) => {
  const password = req.body.password;
  // const confirmPassword = req.body.confirmPassword;
  const userId = req.body.userId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  User.findOne({
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId,
  })
    .then((user) => {
      resetUser = user;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = null;
      resetUser.resetTokenExpiration = null;
      return resetUser.save();
    })
    .then(() => {
      res.status(200).json({ message: "Password reset successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
