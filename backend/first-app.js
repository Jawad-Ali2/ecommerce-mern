const cors = require("cors");
const bodyParse = require("body-parser");
const cookieParse = require("cookie-parser");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const csrfMiddleware = require("./middleware/csrfToken");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const User = require("./models/user");

const app = express();

const store = new MongoDBStore({
  uri: `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.i4mh4vu.mongodb.net/shop`,
  collection: "sessions",
});
const csrfProtection = csrf({ cookie: true });

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // enable cookies and credentials
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParse.urlencoded({ extended: false }));
app.use(cookieParse());
app.use(bodyParse.json());

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // Secure is for https and it saves CSRF (Cross Site Request Forgery)
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
    },
  })
);

//* This middleware is for setting up csrf
app.use(csrfProtection);

//* First we check if user is loggedIn or not to set csfr cookie
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  // this middleware function only run when the server is up and running on localhost
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
      // calls the next function
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
});

//* This middleware is for setting the csrf cookie
app.use(csrfMiddleware);

app.use("/admin", adminData.router);
app.use(shopRoutes.router);
app.use(authRoutes.router);

app.use((req, res) => {
  res.status(404).send("<h1>Page not found!</h1>");
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.i4mh4vu.mongodb.net/shop`
  )
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.log(err);
  });
