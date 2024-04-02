const { DataTypes } = require("sequelize");
const { sequelize } = require("../DB");

const Weather = sequelize.define("Weather", {
  weatherData: {
    allowNull: false,
    type: DataTypes.JSON,
  },
  city: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  temperature:{
    allowNull:true,
    type:DataTypes.FLOAT
  }
});

Weather.sync({ alter: true });

module.exports = Weather;
