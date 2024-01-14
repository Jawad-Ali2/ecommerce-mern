const Product = require("../models/products");

const postAddProduct = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    // createProduct is an associated object added by sequelize automatically
    .createProduct({
      title: title,
      price: price,
      description: description,
      imageUrl: imageUrl,
    })
    .then(() => {
      res.status(201).json({ message: "Product added successfully" });
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const getProducts = (req, res) => {
  req.user
    .getProducts()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getEditProduct = (req, res) => {
  const productId = req.params.id;
  req.user
    .getProducts({ where: { id: productId } })
    // Product.findByPk(productId)
    .then((products) => {
      const product = products[0];
      res.status(200).send(product);
    })
    .catch((err) => res.status(400).json({ message: err }));
};

const postEditProduct = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;

  Product.findByPk(id)
    .then((product) => {
      product.title = title;
      z;
      product.price = price;
      product.description = description;
      product.imageUrl = image;
      // Save changes in database
      return product.save();
    })
    .then(() =>
      res.status(200).json({ message: "Product updated successfully" })
    )
    .catch((err) => res.status(400).json({ message: err }));
};

const postDeleteProduct = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id)
    .then((product) => product.destroy())
    .then(() => Product.findAll())
    .then((product) => res.status(200).send(product))
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports = {
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
