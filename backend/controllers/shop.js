const Order = require("../models/orders");
const Product = require("../models/products");

const getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      // const cookies = req.get("Cookie");
      res
        .status(200)
        .send({ products: products, isLoggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getProductDetails = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const getIndex = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getCart = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;
      res.status(200).send(products);
    })
    .catch((err) => {
      console.log(err);
    });
};

const postToCart = (req, res) => {
  const product = req.body.product;
  req.user
    .addToCart(product)
    .then(() => {
      res.status(200).json({ message: "Added to cart successfully" });
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const deleteFromCart = (req, res) => {
  const id = req.params.id;

  req.user
    .removeFromCart(id)
    .then(() => {
      res.status(200).json({ message: "Delete from cart successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const postAddOrders = (req, res) => {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((product) => {
        return {
          quantity: product.quantity,
          product: { ...product.productId._doc },
        };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart();
    })
    .then(() => {
      res.status(201).json({ message: "Order created" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const getOrders = (req, res) => {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// const getCheckout = (req, res) => {
// res.send("Nothing to see here");
// };

module.exports = {
  getAllProducts,
  getProductDetails,
  getIndex,
  getCart,
  postToCart,
  deleteFromCart,
  postAddOrders,
  getOrders,
  // getCheckout,
};
