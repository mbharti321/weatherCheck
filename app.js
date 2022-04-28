const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
// const ejs = require("ejs");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", function (req, res) {
  // res.sendFile(__dirname + "/index.html");
  res.render("index")
});

app.post("/", function (req, res) {
  // reding city name entered by user
  var queryCity = req.body.cityName;
  queryCity = queryCity.toUpperCase();
  // console.log(process.env.API_KEY);
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&units=" + unit + "&appid=" + apiKey + "";

  // fetch data from opeanWeather API
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // res.send(weatherData)
      // return
      if (weatherData.cod === 200) {
        //if city detils is found
        const temp = weatherData?.main?.temp;
        const description = weatherData?.weather[0]?.description;
        const icon = weatherData?.weather[0]?.icon;
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

        // write data to webpage
        // res.write("<h1> " + queryCity + "</h1>");
        // res.write("<h1>The weather is currently " + description + ". </h1>");
        // res.write("<h3>Current temperature is: " + temp + " degrees Celcius.</h3>");
        // res.write("<img src=" + imageURL + " alt=" + description + ">");
        // res.send();

        const myWeatherData = {
          queryCity: queryCity,
          description: description,
          temp: temp,
          description: description,
          imageURL: imageURL
        }
        // open response page
        res.render("response", myWeatherData);
      } else if (weatherData.cod === "404") {
        // if entered city can't be found
        data = {
          "queryCity": queryCity,
          "message": "we couldn't find your city!!"
        }
        res.render("not-found", data);
      } else {
        data = {
          "queryCity": queryCity,
          "message": "Somthing went wrong!!"
        }
        res.render("not-found", data);
      }


    });
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function () {
  console.log("Server Started successfully!! at: " + port + " http://localhost:3000/");
  // console.log("Server Started successfully!!\nListening to port: http://localhost:3000/")
});
