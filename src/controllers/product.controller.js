const { Product, SellerProfile, Category } = require("../models");

// CREATE
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllProducts = async (req, res) => {
  const products = await Product.findAll({
    include: [{ model: SellerProfile }, { model: Category }],
  });
  res.json(products);
};

// GET BY ID
exports.getProductById = async (req, res) => {
  const product = await Product.findByPk(req.params.id, {
    include: [{ model: SellerProfile }, { model: Category }],
  });

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

// UPDATE
exports.updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.update(req.body);
  res.json(product);
};

// DELETE
exports.deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });

  await product.destroy();
  res.json({ message: "Product deleted" });
};

// GET BY STATUS
exports.getProductsByStatus = async (req, res) => {
  const { status } = req.params;

  const products = await Product.findAll({
    where: { status },
    include: [{ model: SellerProfile }, { model: Category }],
  });

  res.json(products);
};
