const express = require("express");
const router = express.Router();
const controller = require("../controllers/product.controller");
const auth = require("../middlewares/auth.middleware");

// STATUS FILTER (keep above :id)
router.get("/status/:status", controller.getProductsByStatus);

// CRUD
router.post("/", auth, controller.createProduct);
router.get("/", auth, controller.getAllProducts);
router.get("/:id", auth, controller.getProductById);
router.put("/:id", auth, controller.updateProduct);
router.delete("/:id", auth, controller.deleteProduct);

module.exports = router;
