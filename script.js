$(document).ready(function () {
  // MOMENT JS FOR CURRENT TIME AND DATE
  var currentTime = moment().format("dddd MMMM Do YYYY, h:mm:ss a");

  var searchHistory = [];
  //   ON CLICK FUNCTION TO UPDATE PAGE
  $("#search-button").on("click", function () {
    event.preventDefault();
    var currenCity = $("#new-search").val();

    searchHistory =
      JSON.parse(localStorage.getItem(searchHistory)) || [];
    searchHistory.push(currenCity);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory)
    );

    $("#searchedCities").prepend(
      "<li class='list-group-item'>" + $("#new-search").val()
    );

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      currenCity +
      "&units=imperial&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var cityName = response.name;
      var cityTemp = response.main.temp;
      var cityHumidity = response.main.humidity;
      var cityWindSpeed = response.wind.speed;
      var cityUVLongitude = response.coord.lon;
      var cityUVLatitude = response.coord.lat;

      //   CREATING THE ELEMENTS OF MAIN CONTENT
      $("#main-content").empty();
      $("#main-content").append($("<h1>" + cityName + "</h1>"));
      $("#main-content").append($("<h5>" + currentTime + "</h5>"));
      $("#main-content").append(
        $("<h5> Temp: " + cityTemp + " °F</h5>")
      );
      $("#main-content").append(
        $("<h5> Humidity: " + cityHumidity + "%</h5>")
      );
      $("#main-content").append(
        $("<h5> Wind Speed: " + cityWindSpeed + " MPH</h5>")
      );

      //   SEPERATE QUERY NEEDS TO BE RUN TO GET UV INDEX
      //   NOTE: THE QUERY BELOW CONCATS THE VALUES OF LAT AND LON ABOVE TO PULL THE UV INDEX
      var queryUVURL =
        "http://api.openweathermap.org/data/2.5/uvi?appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188" +
        "&lat=" +
        cityUVLatitude +
        "&lon=" +
        cityUVLongitude;

      $.ajax({
        url: queryUVURL,
        method: "GET",
      }).then(function (response) {
        $("#main-content").append(
          // ADDING UV INDEX TO MAIN CONTENT
          $("<h5> UV Index: " + response.value + "</h5>")
        );
      });
      //   5 DAY FORECAST
      $("#forecast-row").empty();
      var queryForecastURL =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        currenCity +
        "&cnt=5&units=imperial&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188";
      $.ajax({
        url: queryForecastURL,
        method: "GET",
      }).then(function (response) {
        for (var i = 0; i < 5; i++) {
          var results = response.list;
          var date = i;
          var temp = results[i].main.temp;
          var humidity = results[i].main.humidity;
          var forecastBox = $(
            "<div class='card text-white bg-primary mx-auto mb-10 p-2' style='width: 8.5rem; height: 11rem;'>"
          );
          var cardTitle = $("<h5 class = 'card-title'>").text(date);
          var cardTemp = $("<p class= 'card-text'>").text(
            "Temp: " + temp
          );

          var cardHumidity = $("<p class = 'card-text'>").text(
            "Humidity: " + humidity + "%"
          );

          var weatherIcon = results[i].weather[0].main;
          if (weatherIcon === "Rain") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/09d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weatherIcon === "Clouds") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/04d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weatherIcon === "Clear") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/01d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weatherIcon === "Drizzle") {
            var icon = $("<img>").attr("src");
            icon.attr("style", "height: 40px; width: 40px");
          } else if (weatherIcon === "Snow") {
            var icon = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/wn/13d@2x.png"
            );
            icon.attr("style", "height: 40px; width: 40px");
          }
          forecastBox.append(cardTitle);
          forecastBox.append(icon);
          forecastBox.append(cardTemp);
          forecastBox.append(cardHumidity);
          $("#forecast-row").append(forecastBox);
        }
      });
    });
  });
});
