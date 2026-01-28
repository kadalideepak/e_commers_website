const { Cart, User } = require("../models");

// CREATE CART
exports.createCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    // prevent duplicate cart per user
    const existing = await Cart.findOne({ where: { user_id } });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Cart already exists for this user" });
    }

    const cart = await Cart.create({ user_id });
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL CARTS
exports.getAllCarts = async (req, res) => {
  const carts = await Cart.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });
  res.json(carts);
};

// GET CART BY ID
exports.getCartById = async (req, res) => {
  const cart = await Cart.findByPk(req.params.id, {
    include: [{ model: User }],
  });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  res.json(cart);
};

// UPDATE CART (touch updated_at)
exports.updateCart = async (req, res) => {
  const cart = await Cart.findByPk(req.params.id);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  await cart.update({});
  res.json({ message: "Cart updated", cart });
};

// DELETE CART
exports.deleteCart = async (req, res) => {
  const cart = await Cart.findByPk(req.params.id);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  await cart.destroy();
  res.json({ message: "Cart deleted successfully" });
};
