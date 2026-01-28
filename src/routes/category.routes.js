const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");
const auth = require("../middlewares/auth.middleware");

// CRUD
router.post("/", auth, controller.createCategory);
router.get("/", auth, controller.getAllCategories);
router.get("/:id", auth, controller.getCategoryById);
router.put("/:id", auth, controller.updateCategory);
router.delete("/:id", auth, controller.deleteCategory);

module.exports = router;
