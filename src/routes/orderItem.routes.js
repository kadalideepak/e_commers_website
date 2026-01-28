const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderItem.controller");

// FILTER APIs (keep above :id)
router.get("/order/:order_id", controller.getOrderItemsByOrderId);
router.get("/seller/:seller_id", controller.getOrderItemsBySellerId);
const auth = require("../middlewares/auth.middleware");

// CRUD
router.post("/", auth, controller.createOrderItem);
router.get("/", auth, controller.getAllOrderItems);
router.get("/:id", auth, controller.getOrderItemById);
router.put("/:id", auth, controller.updateOrderItem);
router.delete("/:id", auth, controller.deleteOrderItem);

module.exports = router;
