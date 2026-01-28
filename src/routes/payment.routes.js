const express = require("express");
const router = express.Router();
const controller = require("../controllers/payment.controller");

// FILTER APIs (keep above :id)
router.get("/method/:method", controller.getPaymentsByMethod);
router.get("/status/:status", controller.getPaymentsByStatus);
const auth = require("../middlewares/auth.middleware");

// CRUD
router.post("/", auth, controller.createPayment);
router.get("/", auth, controller.getAllPayments);
router.get("/:id", auth, controller.getPaymentById);
router.put("/:id", auth, controller.updatePayment);
router.delete("/:id", auth, controller.deletePayment);

module.exports = router;
