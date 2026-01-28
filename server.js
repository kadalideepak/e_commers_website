require("dotenv").config();
const app = require("./src/app");
const sequelize = require("./config/db");

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    // 1️⃣ Check DB connection
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // 2️⃣ Sync all models (creates tables)
    await sequelize.sync();
    console.log("All models synchronized");

    // 3️⃣ Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
})();
