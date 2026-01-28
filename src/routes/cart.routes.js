const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart.controller");
const auth = require("../middlewares/auth.middleware");

// CRUD
router.post("/", auth, controller.createCart);
router.get("/", auth, controller.getAllCarts);
router.get("/:id", auth, controller.getCartById);
router.put("/:id", auth, controller.updateCart);
router.delete("/:id", auth, controller.deleteCart);

module.exports = router;
