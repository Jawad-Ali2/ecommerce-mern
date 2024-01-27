const express = require("express");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/home", shopController.getAllProducts);

router.get("/products", shopController.getIndex);

router.get("/products/:id", shopController.getProductDetails);

router.get("/cart", isAuth, shopController.getCart);
router.post("/cart", isAuth, shopController.postToCart);
router.delete("/delete-item/:id", isAuth, shopController.deleteFromCart);

router.post("/add-order", isAuth, shopController.postAddOrders);
router.get("/orders", isAuth, shopController.getOrders);

// router.get("/checkout", shopController.getCheckout);

module.exports = { router };
