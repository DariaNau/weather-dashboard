var currentDate = moment().format('L');
var API_KEY = "&appid=86945d052a2d837006278947c1238951";
var cities = JSON.parse(localStorage.getItem('cities')) || [];
// console.log(cities)

//if enter is pressed by user trigger the on(click) function
$("#search-input").keyup(function (event) {

    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {

        // Cancel the default action, if needed
        event.preventDefault();

        // Trigger the button element with a click
        $("#searchBtn").click();
    }
});

//function to obtain latitude and logitude information of the UV index and add it to the UVurl
function formatUVQuery(lon, lat) {
    return "&lon=" + lon + "&lat=" + lat
}

// saveSearch();

//on click function declaration - starts 4 ajax calls
$("#searchBtn").on("click", function () {
    var QUERY = $("#search-input").val().trim();
    getData(QUERY);
    $("#search-input").attr("placeholder", "Have another city in mind?");
});

// to save data on the page 
function init() {
    ;
    var query = localStorage.getItem('query') || 'Atlanta';
    getData(query);
}

function getData(QUERY) {

    // set user's input value to local storage
    localStorage.setItem('query', QUERY);

    // set date using moments.js 
    $(".date").text(currentDate);

    // create variables that will hold urls for ajax calls
    var weatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?";

    //create a var that will hold units parameter to get rid of default Kelvin
    var unitsURL = "&units=imperial";

    //LS-1: unshift method is used (instead of push) for each new search inputs to insure that new input is added from the top and not the buttom of the UL
    cities.unshift(QUERY);
    // console.log(cities)

    //LS-2: set and stringify cities input
    localStorage.setItem("cities", JSON.stringify(cities))

    //LS-3: run save search function that will push new inputs into cities array
    saveSearch();

    //ajax call to update first 3 weather conditions
    $.ajax({
        url: weatherURL + QUERY + unitsURL + API_KEY,
        method: "GET"
        // success: getData(queryBtn)
    }).then(function (weatherRes) {

        // UPDATE MAIN WEATHER CARD
        $("#cityName").html(weatherRes.name);
        $("#temp").html(weatherRes.main.temp);
        $("#humid").html(weatherRes.main.humidity);
        $("#wind").html(weatherRes.wind.speed);

        //ajax call to get the UV info
        $.ajax({
            url: uvURL + formatUVQuery(weatherRes.coord.lon, weatherRes.coord.lat) + API_KEY,
            method: "GET"
        }).then(function (uvRes) {

            // UPDATE UV INDEX FOR MAIN WEATHER CARD
            $("#uv").html(uvRes.value);
        });

        var iconPath = weatherRes.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/" + iconPath + "@2x.png";

        // UPDATE ICON FOR MAIN WEATHER CARD
        var IMG1 = $("<img>");
        IMG1.attr("src", iconURL);
        $("#icon").html(IMG1);
    });

    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

    // ajax call to get 5-day forecast data
    $.ajax({
        url: forecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    }).then(function (forecastRes) {

        // UPDATE FORECAST CARDS
        //DAY 1
        var dateOne = moment().add(1, 'days').format('L');
        $("#date1").html(dateOne);

        var icon5dayPath1 = forecastRes.list[2].weather[0].icon;
        var icon5dayURL1 = "https://openweathermap.org/img/wn/" + icon5dayPath1 + "@2x.png";

        var iconDay1 = $("<img>");
        iconDay1.attr("src", icon5dayURL1);
        $("#icon1").html(iconDay1);

        $("#temp1").html(forecastRes.list[2].main.temp);
        $("#humid1").html(forecastRes.list[2].main.humidity);

        //DAY 2
        var dateTwo = moment().add(2, 'days').format('L');
        $("#date2").html(dateTwo);

        var icon5dayPath2 = forecastRes.list[9].weather[0].icon;
        var icon5dayURL2 = "https://openweathermap.org/img/wn/" + icon5dayPath2 + "@2x.png";

        var iconDay2 = $("<img>");
        iconDay2.attr("src", icon5dayURL2);
        $("#icon2").html(iconDay2);

        $("#temp2").html(forecastRes.list[9].main.temp);
        $("#humid2").html(forecastRes.list[9].main.humidity);

        //DAY 3
        var dateThree = moment().add(3, 'days').format('L');
        $("#date3").html(dateThree);

        var icon5dayPath3 = forecastRes.list[17].weather[0].icon;
        var icon5dayURL3 = "https://openweathermap.org/img/wn/" + icon5dayPath3 + "@2x.png";

        var iconDay3 = $("<img>");
        iconDay3.attr("src", icon5dayURL3);
        $("#icon3").html(iconDay3);

        $("#temp3").html(forecastRes.list[17].main.temp);
        $("#humid3").html(forecastRes.list[17].main.humidity);

        //DAY 4
        var dateFour = moment().add(4, 'days').format('L');
        $("#date4").html(dateFour);

        var icon5dayPath4 = forecastRes.list[25].weather[0].icon;
        var icon5dayURL4 = "https://openweathermap.org/img/wn/" + icon5dayPath4 + "@2x.png";

        var iconDay4 = $("<img>");
        iconDay4.attr("src", icon5dayURL4);
        $("#icon4").html(iconDay4);

        $("#temp4").html(forecastRes.list[25].main.temp);
        $("#humid4").html(forecastRes.list[25].main.humidity);

        //DAY 5
        var dateFive = moment().add(5, 'days').format('L');
        $("#date5").html(dateFive);

        var icon5dayPath5 = forecastRes.list[33].weather[0].icon;
        var icon5dayURL5 = "https://openweathermap.org/img/wn/" + icon5dayPath5 + "@2x.png";

        var iconDay5 = $("<img>");
        iconDay5.attr("src", icon5dayURL5);
        $("#icon5").html(iconDay5);

        $("#temp5").html(forecastRes.list[33].main.temp);
        $("#humid5").html(forecastRes.list[33].main.humidity);
    });
}

// function to create a user search history and limit it to 5 to appear on the page
function saveSearch() {

    //clear the UL that will hold all ne <li> elements before appending
    $("#city-list").empty();
    for (i = 0; i < cities.length; i++) {
        newCity = $("<button></button>").append(cities[i]).addClass("btn btn-light m-1 searches mb-2");
        $("#city-list").append(newCity);
        cities = cities.slice(0, 5);
    }

    //clear user's input area
    $("#search-input").val("");
}

// on click event for every new city button created run getData function in accordance with user's search
$("#city-list").on("click", ".searches", function () {
    //   console.log($(this).text());
    var queryBtn = $(this).text();
    getData(queryBtn);
})

init();
