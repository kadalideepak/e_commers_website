const express = require("express");
const router = express.Router();
const controller = require("../controllers/sellerProfile.controller");
const auth = require("../middlewares/auth.middleware");

// CRUD
router.post("/", auth, controller.createSellerProfile);
router.get("/", auth, controller.getAllSellerProfiles);
router.get("/:id", auth, controller.getSellerProfileById);
router.put("/:id", auth, controller.updateSellerProfile);
router.delete("/:id", auth, controller.deleteSellerProfile);

// STATUS FILTER
router.get("/status/:status", auth, controller.getSellerProfilesByStatus);
router.get("/:id", auth, controller.getSellerProfileById);

module.exports = router;
