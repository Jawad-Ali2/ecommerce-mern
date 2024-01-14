const express = require("express");
const adminController = require("../controllers/admin");

const router = express.Router();

// /admin/add-product => POST
router.post("/add-product", adminController.postAddProduct);

router.get("/products", adminController.getProducts);

router.get("/edit-product/:id", adminController.getEditProduct);

router.post("/edit-product", adminController.postEditProduct);

router.delete("/delete-product/:id", adminController.postDeleteProduct);

module.exports = {
  router,
};
