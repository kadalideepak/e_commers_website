const { Review, Product, User } = require("../models");

// CREATE
exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllReviews = async (req, res) => {
  const reviews = await Review.findAll({
    include: [Product, User],
  });
  res.json(reviews);
};

// GET BY ID
exports.getReviewById = async (req, res) => {
  const review = await Review.findByPk(req.params.id, {
    include: [Product, User],
  });

  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  res.json(review);
};

// UPDATE
exports.updateReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  await review.update(req.body);
  res.json(review);
};

// DELETE
exports.deleteReview = async (req, res) => {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).json({ message: "Review not found" });

  await review.destroy();
  res.json({ message: "Review deleted successfully" });
};

// 🔍 GET BY PRODUCT ID
exports.getReviewsByProductId = async (req, res) => {
  const { product_id } = req.params;

  const reviews = await Review.findAll({
    where: { product_id },
    include: [User],
  });

  res.json(reviews);
};
