const Product = require("../models/products");
// const Cart = require("../models/cart");

const getAllProducts = (req, res) => {
  Product.fetchAll()
    .then((products) => {
      res.status(200).send(products);
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
  Product.fetchAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getCart = (req, res) => {
  req.user
    .getCart()
    .then((products) => {
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
  const price = req.body.price;

  req.user
    .deleteFromCart(id)
    .then(() => {
      res.status(200).json({ message: "Delete from cart successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const postAddOrders = (req, res) => {
  req.user
    .addOrder()
    .then(() => {
      res.status(201).json({ message: "Order created" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const getOrders = (req, res) => {
  req.user
    // include here says: Also give products along with the orders. (We have the association made)
    .getOrders()
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

// const getCheckout = (req, res) => {
//   res.send("Nothing to see here");
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
