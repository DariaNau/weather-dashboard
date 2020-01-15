var API_KEY = "&appid=86945d052a2d837006278947c1238951";
var cities = JSON.parse(localStorage.getItem('cities')) || []

console.log(cities)

$("#searchBtn").on("click", function () {

    // queryURL is the url we'll use to query the API
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=";
    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?" + formatUVQuery();

    // // Grab text the user typed into the search input
    var QUERY = $("#search-input")
        .val()
        .trim();

    // push new search inputs into the JSON.parsed array
    cities.push(QUERY)
    // console.log(cities)

    // set and stringify cities input
    localStorage.setItem("cities", JSON.stringify(cities))

    //create a var that will hold units parameter to get rid of default Kelvin

    var unitsURL = "&units=imperial"

    //ajax call to update first 3 weather conditions

    $.ajax({
        url: weatherURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    }).then(function (weatherRes) {

        // UPDATE MAIN WEATHER CARD
        // console.log(weatherRes);


        //ajax call to get the UV info
        $.ajax({
            url: uvURL + formatUVQuery(weatherRes.coord.lat, weatherRes.coord.lon) + unitsURL + API_KEY,
            method: "GET"
        }).then(function (uvRes) {

            // UPDATE UV INDEX FOR MAIN WEATHER CARD
            // console.log(uvRes);

        });
    });

    // ajax call to get 5-day forecast
    $.ajax({
        url: forecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
        // var forecastRes = $.ajax(){ return promise }
    }).then(function (forecastRes) {
        // UPDATE FORECAST CARDS
        // console.log(forecastRes);

    });


});

//function to obtain latitude and logitude information of the UV index and add it to the UVurl

function formatUVQuery(lat, lon) {
    return "&lat=" + lat + "&lon=" + lon
}

