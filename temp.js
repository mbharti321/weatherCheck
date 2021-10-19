const express = require("express");
const https = require("https");

const app = express();


app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Bengaluru&units=metric&appid=2d46b42460fc49e01757cecc18c83e78";

    https.get(url, function (response) {
        // console.log(response);
        response.on("data", function (data) {
            // console.log(data);
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            var imageURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            // res.send(JSON.stringify(weatherData));
            // res.send(weatherData);
            // console.log(temp);
            // console.log(description);

            // var weatherReport = "<h1>Current temperature is: "+ temp + " degrees Celcius.</h1>";
            // weatherReport += "<h3>The weather is currently "+ description +"</h3>";
            res.write("<h1> Bengaluru</h1>");
            res.write("<h1>The weather is currently " + description + ". </h1>");
            res.write("<h3>Current temperature is: " + temp + " degrees Celcius.</h3>");
            res.write("<img src=" +imageURL +" alt=" + description +">");
            res.send();
        });
    });

});

app.listen(3000, function () {
    console.log("Server started at 3000 !!");
});

