const { Order, User } = require("../models");

// CREATE ORDER
exports.createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL ORDERS
exports.getAllOrders = async (req, res) => {
  const orders = await Order.findAll({
    include: [{ model: User, attributes: ["id", "name", "email"] }],
  });
  res.json(orders);
};

// GET ORDER BY ID
exports.getOrderById = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
    include: [{ model: User }],
  });

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

// UPDATE ORDER
exports.updateOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await order.update(req.body);
  res.json(order);
};

// DELETE ORDER
exports.deleteOrder = async (req, res) => {
  const order = await Order.findByPk(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });

  await order.destroy();
  res.json({ message: "Order deleted successfully" });
};

// 🔍 GET ORDERS BY ORDER STATUS
exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  const orders = await Order.findAll({
    where: { status },
    include: [{ model: User }],
  });

  res.json(orders);
};

// 🔍 GET ORDERS BY PAYMENT STATUS
exports.getOrdersByPaymentStatus = async (req, res) => {
  const { payment_status } = req.params;

  const orders = await Order.findAll({
    where: { payment_status },
    include: [{ model: User }],
  });

  res.json(orders);
};
