const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

// const transporter = nodemailer.createTransport(sendGridTransport({
//   auth: {
//     api_user
//   }
// }));

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
