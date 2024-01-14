const Product = require("../models/products");
const Cart = require("../models/cart");

const getAllProducts = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getProductDetails = (req, res) => {
  const productId = req.params.id;
  Product.findByPk(productId)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const getIndex = (req, res) => {
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getCart = (req, res) => {
  console.log("klfjgd");
  req.user
    .getCart()
    .then((cartProducts) => {
      return cartProducts
        .getProducts()
        .then((products) => {
          res.status(200).send(products);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
};

const postToCart = (req, res) => {
  const product = req.body.product;
  const prodId = product.id;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: product.id } });
    })
    .then((products) => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(prodId);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.status(200).json({ message: "Added to cart successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(product);
  // Cart.addProduct(product);
};

const deleteFromCart = (req, res) => {
  const id = req.params.id;
  const price = req.body.price;

  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: id } });
    })
    .then((products) => {
      const product = products[0];

      product.cartItem.destroy();
    })
    .then(() => {
      res.status(200).json({ message: "Delete from cart successfully" });
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const postAddOrders = (req, res) => {
  let fetchedCart;
  let cartProducts;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then((products) => {
      cartProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      order.addProducts(
        cartProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };

          return product;
        })
      );
    })
    .then(() => {
      return fetchedCart.setProducts(null);
    })
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
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.status(200).send(orders);
    })
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

const getCheckout = (req, res) => {
  res.send("Nothing to see here");
};

module.exports = {
  getAllProducts,
  getProductDetails,
  getIndex,
  getCart,
  postToCart,
  deleteFromCart,
  postAddOrders,
  getOrders,
  getCheckout,
};
