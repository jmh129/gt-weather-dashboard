$(document).ready(function () {

    $("#new-search").on("click",function() {
    var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=atlanta,georgia&units=imperial&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188"

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function(response) {
        console.log(response);
        var cityName = response.name;
        var cityTemp = response.main.temp;
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        // console.log(cityName);
        $("#main-content").append($("<h1>" + cityName + "</h1>"));
        $("#main-content").append($("<h3> Temp: " + cityTemp + " °F</h3>"));
        $("#main-content").append($("<h3> Humidity: " + cityHumidity + "</h3>"));
        $("#main-content").append($("<h3> Wind Speed: " + cityWindSpeed + "</h3>"));
    
    });
    })
});
