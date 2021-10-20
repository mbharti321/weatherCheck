const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    // const queryCity = "Bengaluru";
    // reding city name entered by user
    var queryCity = req.body.cityName;
    queryCity = queryCity.toUpperCase();
    const apiKey = "2d46b42460fc49e01757cecc18c83e78";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + queryCity + "&units=" + unit + "&appid=" + apiKey + "";

    https.get(url, function (response) {
        // console.log(response);
        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1> " + queryCity + "</h1>");
            res.write("<h1>The weather is currently " + description + ". </h1>");
            res.write("<h3>Current temperature is: " + temp + " degrees Celcius.</h3>");
            res.write("<img src=" + imageURL + " alt=" + description + ">");
            res.send();
        });
    });
});



app.listen(3000, function () {
    console.log("Server started at 3000 !!");
});

