const { Payment, Order } = require("../models");

// CREATE
exports.createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllPayments = async (req, res) => {
  const payments = await Payment.findAll({
    include: [{ model: Order }],
  });
  res.json(payments);
};

// GET BY ID
exports.getPaymentById = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id, {
    include: [{ model: Order }],
  });

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json(payment);
};

// UPDATE
exports.updatePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: "Payment not found" });

  await payment.update(req.body);
  res.json(payment);
};

// DELETE
exports.deletePayment = async (req, res) => {
  const payment = await Payment.findByPk(req.params.id);
  if (!payment) return res.status(404).json({ message: "Payment not found" });

  await payment.destroy();
  res.json({ message: "Payment deleted successfully" });
};

// 🔍 GET BY PAYMENT METHOD
exports.getPaymentsByMethod = async (req, res) => {
  const { method } = req.params;

  const payments = await Payment.findAll({
    where: { payment_method: method },
    include: [{ model: Order }],
  });

  res.json(payments);
};

// 🔍 GET BY STATUS
exports.getPaymentsByStatus = async (req, res) => {
  const { status } = req.params;

  const payments = await Payment.findAll({
    where: { status },
    include: [{ model: Order }],
  });

  res.json(payments);
};
