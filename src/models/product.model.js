module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      seller_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
      },

      status: {
        type: DataTypes.ENUM("ACTIVE", "INACTIVE", "OUT_OF_STOCK"),
        defaultValue: "ACTIVE",
      },

      stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      tableName: "products",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return Product;
};
