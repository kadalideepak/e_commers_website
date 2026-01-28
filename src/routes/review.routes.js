const express = require("express");
const router = express.Router();
const controller = require("../controllers/review.controller");
const auth = require("../middlewares/auth.middleware");

// FILTER (keep above :id)
router.get("/product/:product_id", controller.getReviewsByProductId);

// CRUD
router.post("/", auth, controller.createReview);
router.get("/", auth, controller.getAllReviews);
router.get("/:id", auth, controller.getReviewById);
router.put("/:id", auth, controller.updateReview);
router.delete("/:id", auth, controller.deleteReview);

module.exports = router;
