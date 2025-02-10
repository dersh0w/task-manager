const pool = require("../config/db");

async function testConnection() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("Connection to the database was successful!");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
}

testConnection();
