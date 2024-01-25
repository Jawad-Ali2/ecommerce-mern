const User = require("../models/user");

exports.postLogin = (req, res) => {
  // Here in this req, the data is lost when the response is sent...
  // * So we can't access or save the user loggedIn Detail in request
  //   req.isLoggedIn = true;
  // req.session.loggedIn = true;
  // res.cookie("loggedIn", true);
  User.findById("65acfeef69f8ef0cd3baecad")
    .then((user) => {
      req.session.loggedIn = true;
      req.session.user = {
        _id: user._id.toString(),
        cart: user.cart,
        name: user.name,
        email: user.email,
      };

      req.session.save((err) => {
        console.log(err);
        if (err) {
          res.status(500).json({ message: "Internal server error" });
        }
      });
      res.status(200).json({ message: "Logged in successfully" });
    })
    .catch((err) => {
      console.log(err, "Error from here");
    });
};

exports.postLogout = (req, res) => {
  // Clear the session
  req.session.destroy((err) => {
    console.log(err);
    res.status(200).json({ message: "Logged out successfully" });
  });
};
