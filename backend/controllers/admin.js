const Product = require("../models/products");

const postAddProduct = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    //* Here the mongoose takes the id from the user automatically due to ref property..
    userId: req.user,
  });
  product
    .save()
    .then(() => {
      res.status(201).json({ message: "Product added successfully" });
    })
    .catch((err) => res.status(500).json({ message: err }));
};

const getProducts = (req, res) => {
  Product.find()
    // .select("title price -_id") // Select or unselect what we want from the database // * This will fetch only title price and exclude _id
    // .populate("userId") // Populate will fetch the user with userId
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

const getEditProduct = (req, res) => {
  const productId = req.params.id;

  Product.findById(productId)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => res.send(500).json({ message: err }));
};

const postEditProduct = (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const image = req.body.image;
  const price = req.body.price;
  const description = req.body.description;

  Product.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        price: price,
        description: description,
        imageUrl: image,
      },
    }
  )
    .then(() =>
      res.status(200).json({ message: "Product updated successfully" })
    )
    .catch((err) => res.status(400).json({ message: err }));
};

const postDeleteProduct = (req, res) => {
  const id = req.params.id;

  Product.deleteOne({ _id: id })
    .then(() => Product.find())
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => res.status(500).json({ message: err }));
};

module.exports = {
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
};
