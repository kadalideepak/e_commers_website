const { CartItem, Cart, Product } = require("../models");

// CREATE
exports.createCartItem = async (req, res) => {
  try {
    const { cart_id, product_id, quantity, price } = req.body;

    // check if item already exists in cart
    const existingItem = await CartItem.findOne({
      where: { cart_id, product_id },
    });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.json(existingItem);
    }

    const item = await CartItem.create({
      cart_id,
      product_id,
      quantity,
      price,
    });

    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllCartItems = async (req, res) => {
  const items = await CartItem.findAll({
    include: [{ model: Product }, { model: Cart }],
  });
  res.json(items);
};

// GET BY ID
exports.getCartItemById = async (req, res) => {
  const item = await CartItem.findByPk(req.params.id, {
    include: [{ model: Product }],
  });

  if (!item) {
    return res.status(404).json({ message: "Cart item not found" });
  }

  res.json(item);
};

// UPDATE
exports.updateCartItem = async (req, res) => {
  const item = await CartItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  await item.update(req.body);
  res.json(item);
};

// DELETE
exports.deleteCartItem = async (req, res) => {
  const item = await CartItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  await item.destroy();
  res.json({ message: "Cart item deleted" });
};

// 🔍 GET BY CART ID (YOUR REQUIREMENT)
exports.getCartItemsByCartId = async (req, res) => {
  const { cart_id } = req.params;

  const items = await CartItem.findAll({
    where: { cart_id },
    include: [{ model: Product }],
  });

  res.json(items);
};
