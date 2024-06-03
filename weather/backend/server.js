const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({ extended: true })); // its compalsory every time

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const apikey = "49e61c8948351837aa6d0cb2ff47c87c";
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey +
    "&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const wspeed = weatherData.wind.speed;
      const feels = weatherData.main.feels_like;
      const image = weatherData.weather[0].icon;
      const cloud = weatherData.weather[0].description;

      //res.write(image);

      res.write("<p>wind speed " + wspeed + "</p>");
      res.write(
        "<h1>The Temperature in " + city + " is " + temp + " degree</h1>"
      );
      res.write("Cloud=" + cloud);

      const imgsrc = "https://openweathermap.org/img/wn/" + image + "@2x.png";
      res.write("<img src=" + imgsrc + "></img>");
      console.log(weatherData);
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("Server is runnimg on port 3000");
});
