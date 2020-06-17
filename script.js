$(document).ready(function () {
  // MOMENT JS FOR CURRENT TIME AND DATE
  var currentTime = moment().format("dddd MMMM Do YYYY, h:mm:ss a");

  //   ON CLICK FUNCTION TO UPDATE PAGE
  $("#new-search").on("click", function () {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=atlanta,georgia&units=imperial&appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      var cityName = response.name;
      var cityTemp = response.main.temp;
      var cityHumidity = response.main.humidity;
      var cityWindSpeed = response.wind.speed;
      var cityUVLongitude = response.coord.lon;
      console.log(cityUVLongitude);
      var cityUVLatitude = response.coord.lat;
      console.log(cityUVLatitude);

      // console.log(cityName);
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

      var queryUVURL = "http://api.openweathermap.org/data/2.5/uvi?appid=b0aa3b9d4dd84a5bdf53dfbf2bbd9188" +
      "&lat=" +
      cityUVLatitude +
      "&lon=" +
      cityUVLongitude;

      console.log(queryUVURL);

      $.ajax({
        url: queryUVURL,
        method: "GET",
      }).then(function (response) {
        $("#main-content").append(
          $("<h5> UV Index: " + response.value + "</h5>")
        );
      });
    });
  });
});
