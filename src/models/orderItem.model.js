module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("PENDING", "SHIPPED", "DELIVERED", "RETURNED"),
        defaultValue: "PENDING",
      },
    },
    {
      tableName: "order_items",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return OrderItem;
};
