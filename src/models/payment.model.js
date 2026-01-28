module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
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

      payment_method: {
        type: DataTypes.ENUM("CARD", "UPI", "NETBANKING"),
        allowNull: false,
      },

      transaction_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },

      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },

      status: {
        type: DataTypes.ENUM("SUCCESS", "FAILED", "REFUND"),
        defaultValue: "SUCCESS",
      },
    },
    {
      tableName: "payments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false,
    },
  );

  return Payment;
};
