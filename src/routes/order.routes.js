const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const auth = require("../middlewares/auth.middleware");

// SEARCH APIs (keep above :id)
router.get("/status/:status", controller.getOrdersByStatus);
router.get(
  "/payment-status/:payment_status",
  controller.getOrdersByPaymentStatus,
);

// CRUD
router.post("/", auth, controller.createOrder);
router.get("/", auth, controller.getAllOrders);
router.get("/:id", auth, controller.getOrderById);
router.put("/:id", auth, controller.updateOrder);
router.delete("/:id", auth, controller.deleteOrder);

module.exports = router;
