const cors = require("cors");
const bodyParse = require("body-parser");
const express = require("express");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const sequelize = require("./utils/database");
const Product = require("./models/products");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const OrderItem = require("./models/orderItem");
const Order = require("./models/order");

const app = express();

app.use(cors());
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.use((req, res, next) => {
  // this middleware function only run when the server is up and running on localhost
  User.findByPk(1)
    .then((user) => {
      req.user = user;
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

// Adds foreign key
// Cascade = If any user is delete all products related to him gets deleted
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });

User.hasMany(Product);
User.hasOne(Cart);
// inverse of above relation, second one is not  really required but its better for understanding
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
// Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      User.create({
        name: "Jawad",
        email: "jawadali66667@gmail.com",
      });
    }

    return user;
  })
  .then((user) => {
    return user.createCart();
  })
  .then(() => {
    app.listen(8000);
  })
  .catch((err) => {
    console.error(err);
  });
