const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL USERS
exports.getAllUsers = async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
  });
  res.json(users);
};

// GET USER BY ID
exports.getUserById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

// UPDATE USER
exports.updateUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.update(req.body);
  res.json({ message: "User updated", user });
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  await user.destroy();
  res.json({ message: "User deleted" });
};

// GET USERS BY ROLE (SPECIAL RULE)
exports.getUsersByRole = async (req, res) => {
  const { role } = req.params;

  let condition = {};

  if (role === "ADMIN") {
    condition.role = {
      [Op.in]: ["ADMIN", "SELLER", "CUSTOMER"],
    };
  } else {
    condition.role = role;
  }

  const users = await User.findAll({
    where: condition,
    attributes: { exclude: ["password"] },
  });

  res.json(users);
};
