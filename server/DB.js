const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:Maa@1234@localhost:5432/weather"
);

async function testDatabaseConnection() {
  try {
    // Attempt to authenticate the connection
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { testDatabaseConnection, sequelize };
