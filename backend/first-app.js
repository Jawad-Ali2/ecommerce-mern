const cors = require("cors");
const bodyParse = require("body-parser");
const express = require("express");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const User = require("./models/user");
const mongoConnect = require("./utils/database").mongoConnect;

const app = express();

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use((req, res, next) => {
  // this middleware function only run when the server is up and running on localhost
  User.findById("65aa1152e934fd4274b51381")
    .then((user) => {
      req.user = new User(user.name, user.email, user.cart, user._id);
      next();
      // calls the next function
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

app.use("/admin", adminData.router);
app.use(shopRoutes.router);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

mongoConnect(() => {
  app.listen(8000);
});
