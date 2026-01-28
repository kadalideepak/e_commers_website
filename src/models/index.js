const Sequelize = require("sequelize");
const sequelize = require("../../config/db");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// MODELS
db.User = require("./user.model")(sequelize, Sequelize.DataTypes);
db.SellerProfile = require("./sellerProfile.model")(
  sequelize,
  Sequelize.DataTypes,
);
db.Category = require("./category.model")(sequelize, Sequelize.DataTypes);
db.Product = require("./product.model")(sequelize, Sequelize.DataTypes);

db.Cart = require("./cart.model")(sequelize, Sequelize.DataTypes);

db.CartItem = require("./cartItem.model")(sequelize, Sequelize.DataTypes);

db.Order = require("./order.model")(sequelize, Sequelize.DataTypes);

db.OrderItem = require("./orderItem.model")(sequelize, Sequelize.DataTypes);

db.Payment = require("./payment.model")(sequelize, Sequelize.DataTypes);

db.Review = require("./review.model")(sequelize, Sequelize.DataTypes);
/* =========================
   ASSOCIATIONS (IMPORTANT)
   ========================= */

// User ↔ SellerProfile
db.User.hasOne(db.SellerProfile, {
  foreignKey: "user_id",
});

db.SellerProfile.belongsTo(db.User, {
  foreignKey: "user_id",
});

// SellerProfile ↔ Product
db.SellerProfile.hasMany(db.Product, {
  foreignKey: "seller_id",
});

db.Product.belongsTo(db.SellerProfile, {
  foreignKey: "seller_id",
});

// Category ↔ Product
db.Category.hasMany(db.Product, {
  foreignKey: "category_id",
});

db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
});

// Cart ↔ CartItem
db.Cart.hasMany(db.CartItem, { foreignKey: "cart_id" });
db.CartItem.belongsTo(db.Cart, { foreignKey: "cart_id" });

// Product ↔ CartItem
db.Product.hasMany(db.CartItem, { foreignKey: "product_id" });
db.CartItem.belongsTo(db.Product, { foreignKey: "product_id" });

// User ↔ Cart (One-to-One)
db.User.hasOne(db.Cart, { foreignKey: "user_id" });
db.Cart.belongsTo(db.User, { foreignKey: "user_id" });

// User ↔ Order
db.User.hasMany(db.Order, { foreignKey: "user_id" });
db.Order.belongsTo(db.User, { foreignKey: "user_id" });

// Order ↔ OrderItem
db.Order.hasMany(db.OrderItem, { foreignKey: "order_id" });
db.OrderItem.belongsTo(db.Order, { foreignKey: "order_id" });

// SellerProfile ↔ OrderItem
db.SellerProfile.hasMany(db.OrderItem, { foreignKey: "seller_id" });
db.OrderItem.belongsTo(db.SellerProfile, { foreignKey: "seller_id" });

// Product ↔ OrderItem
db.Product.hasMany(db.OrderItem, { foreignKey: "product_id" });
db.OrderItem.belongsTo(db.Product, { foreignKey: "product_id" });

// Order ↔ Payment
db.Order.hasMany(db.Payment, { foreignKey: "order_id" });
db.Payment.belongsTo(db.Order, { foreignKey: "order_id" });

// Product ↔ Review
db.Product.hasMany(db.Review, { foreignKey: "product_id" });
db.Review.belongsTo(db.Product, { foreignKey: "product_id" });

// User ↔ Review
db.User.hasMany(db.Review, { foreignKey: "user_id" });
db.Review.belongsTo(db.User, { foreignKey: "user_id" });
module.exports = db;
