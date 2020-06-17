$(document).ready(function () {
  // MOMENT JS FOR CURRENT TIME AND DATE
  var currentTime = moment().format("dddd MMMM Do YYYY, h:mm:ss a");

  //   ON CLICK FUNCTION TO UPDATE PAGE
  $("#search-button").on("click", function () {
      event.preventDefault();
      var currenCity = $("#new-search").val();
      console.log(currenCity);
  

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" + currenCity + "&units=imperial&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188";
console.log(queryURL);
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
      // 5 DAY FORECAST
    //   var queryForecastURL =
    //     "http://api.openweathermap.org/data/2.5/forecast?q=atlanta,georgia&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188";
    //   $.ajax({
    //     url: queryForecastURL,
    //     method: "GET",
    //   }).then(function (response) {
    //     for (var i = 0; i < 5; i++) {
    //       var date = results[i].dt_txt;
    //       var temp = results[i].main.temp;
    //       var humidity = results[i].main.humidity;

    //     }
    //   });

    $("#searchedCities").prepend("<li class='list-group-item'>" + $("#new-search").val());
    });
  });
});
