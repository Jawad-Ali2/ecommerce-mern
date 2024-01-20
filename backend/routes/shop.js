const express = require("express");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/home", shopController.getAllProducts);

router.get("/products", shopController.getIndex);

router.get("/products/:id", shopController.getProductDetails);

router.get("/cart", shopController.getCart);
router.post("/cart", shopController.postToCart);
router.delete("/delete-item/:id", shopController.deleteFromCart);

router.post("/add-order", shopController.postAddOrders);
router.get("/orders", shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = { router };
