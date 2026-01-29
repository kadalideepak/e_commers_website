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
    // Show a clean error message without full stack trace
    console.error("❌ Unable to connect to database.");
    console.error(
      "Reason:",
      error?.original?.code || error?.message || "Unknown error",
    );
    console.error(
      "Please check your DB server, credentials (DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD) and try again.",
    );
    process.exit(1);
  }
})();
