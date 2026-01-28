const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartItem.controller");
const auth = require("../middlewares/auth.middleware");

// SEARCH BY CART ID (keep above :id)
router.get("/cart/:cart_id", auth, controller.getCartItemsByCartId);

// CRUD
router.post("/", auth, controller.createCartItem);
router.get("/", auth, controller.getAllCartItems);
router.get("/:id", auth, controller.getCartItemById);
router.put("/:id", auth, controller.updateCartItem);
router.delete("/:id", auth, controller.deleteCartItem);

module.exports = router;
