const { Category } = require("../models");

// CREATE
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Category.findOne({ where: { name } });
    if (exists) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALLL
exports.getAllCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

// GET BY ID
exports.getCategoryById = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }
  res.json(category);
};

// UPDATE
exports.updateCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.update(req.body);
  res.json(category);
};

// DELETE
exports.deleteCategory = async (req, res) => {
  const category = await Category.findByPk(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  await category.destroy();
  res.json({ message: "Category deleted successfully" });
};
