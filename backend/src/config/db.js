require("dotenv").config();
const { Sequelize } = require("sequelize");

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
