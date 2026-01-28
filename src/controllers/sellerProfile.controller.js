const { SellerProfile, User } = require("../models");

// CREATE
exports.createSellerProfile = async (req, res) => {
  try {
    const profile = await SellerProfile.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
exports.getAllSellerProfiles = async (req, res) => {
  const profiles = await SellerProfile.findAll({
    include: [{ model: User, attributes: ["id", "name", "email", "role"] }],
  });
  res.json(profiles);
};

// GET BY ID (example: id=1 → full data)
exports.getSellerProfileById = async (req, res) => {
  const profile = await SellerProfile.findByPk(req.params.id, {
    include: [{ model: User }],
  });

  if (!profile) {
    return res.status(404).json({ message: "Seller profile not found" });
  }

  res.json(profile);
};

// UPDATE
exports.updateSellerProfile = async (req, res) => {
  const profile = await SellerProfile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ message: "Not found" });

  await profile.update(req.body);
  res.json(profile);
};

// DELETE
exports.deleteSellerProfile = async (req, res) => {
  const profile = await SellerProfile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ message: "Not found" });

  await profile.destroy();
  res.json({ message: "Seller profile deleted" });
};

// GET BY STATUS
exports.getSellerProfilesByStatus = async (req, res) => {
  const { status } = req.params;

  const profiles = await SellerProfile.findAll({
    where: { status },
    include: [{ model: User }],
  });

  res.json(profiles);
};
