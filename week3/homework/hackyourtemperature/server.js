const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const API_KEY = require("./sources/keys.json").API_KEY;
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: false }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/weather", async (req, res) => {
  const cityName = req.body.cityName;
  await axios(
    `https://api.openweathermap.org/data/2.5/weather?APPID=${API_KEY}&units=metric&q=${cityName}`
  )
    .then((response) => {
      const cityTemp = response.data.main.temp;
      res.render("index", {
        cityName: cityName,
        weatherText: `The temperature in ${cityName} is ${cityTemp} °C`,
      });
    })
    .catch((error) => {
      res.render("index", {
        cityName: cityName,
        weatherText: "City is not found!",
      });
    });
});

app.listen(PORT, () => {
  console.log(`HackYourTemperature app running at http://localhost:${PORT}`);
});
