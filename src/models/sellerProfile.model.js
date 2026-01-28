module.exports = (sequelize, DataTypes) => {
  const SellerProfile = sequelize.define(
    "SellerProfile",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      shop_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      gst_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      commission_percent: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("PENDING", "APPROVED", "REJECTED"),
        defaultValue: "PENDING",
      },
    },
    {
      tableName: "seller_profiles",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return SellerProfile;
};
