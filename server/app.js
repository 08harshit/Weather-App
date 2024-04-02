const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { testDatabaseConnection, sequelize } = require("./DB");
const Weather = require("./models/weatherModel");

dotenv.config();

const cors = require("cors");
app.use(cors());
async function getWeatherData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}`
  );

  const weatherData = await response.json();

  await Weather.create({ weatherData, city: location, temperature:weatherData.main.temp });
  return weatherData;
}

app.get("/", async (req, res) => {
  const location = req.query.city;
  console.log(req.query);
  const weatherData = await getWeatherData(location);
  res.send(weatherData);
});

// const sequelize = new Sequelize(
//   "postgres://postgres:Maa@1234@localhost:5432/weather"
// );

testDatabaseConnection();

app.listen(3001, () => {
  console.log("live on:http://localhost:3001");
});
