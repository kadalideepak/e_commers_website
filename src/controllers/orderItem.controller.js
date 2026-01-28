const { OrderItem, Order, SellerProfile, Product } = require("../models");

// CREATE
exports.createOrderItem = async (req, res) => {
  try {
    const item = await OrderItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllOrderItems = async (req, res) => {
  const items = await OrderItem.findAll({
    include: [Order, SellerProfile, Product],
  });
  res.json(items);
};

// GET BY ID
exports.getOrderItemById = async (req, res) => {
  const item = await OrderItem.findByPk(req.params.id, {
    include: [Order, SellerProfile, Product],
  });

  if (!item) {
    return res.status(404).json({ message: "Order item not found" });
  }

  res.json(item);
};

// UPDATE
exports.updateOrderItem = async (req, res) => {
  const item = await OrderItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  await item.update(req.body);
  res.json(item);
};

// DELETE
exports.deleteOrderItem = async (req, res) => {
  const item = await OrderItem.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: "Not found" });

  await item.destroy();
  res.json({ message: "Order item deleted" });
};

// 🔍 GET BY ORDER ID
exports.getOrderItemsByOrderId = async (req, res) => {
  const { order_id } = req.params;

  const items = await OrderItem.findAll({
    where: { order_id },
    include: [SellerProfile, Product],
  });

  res.json(items);
};

// 🔍 GET BY SELLER ID
exports.getOrderItemsBySellerId = async (req, res) => {
  const { seller_id } = req.params;

  const items = await OrderItem.findAll({
    where: { seller_id },
    include: [Order, Product],
  });

  res.json(items);
};
