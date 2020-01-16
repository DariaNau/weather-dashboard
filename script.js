var currentDate = moment().format('L');
var API_KEY = "&appid=86945d052a2d837006278947c1238951";
var cities = JSON.parse(localStorage.getItem('cities')) || []
// console.log(cities)



//if enter is pressed by user trigger the on(click) function
$("#search-input").keyup(function(event) {
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

saveSearch();

//on click function declaration - 4 ajax calls
$("#searchBtn").on("click", function () {

    $(".date").text(currentDate);
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?q=";
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi?";
    var unitsURL = "&units=imperial";
    
    // // Grab text the user typed into the search input
    var QUERY = $("#search-input").val().trim();
    
    // push new search inputs into the JSON.parsed array
    cities.push(QUERY)
    // console.log(cities)
    
    // set and stringify cities input
    localStorage.setItem("cities", JSON.stringify(cities))
    
    //create a var that will hold units parameter to get rid of default Kelvin
    
    
    //ajax call to update first 3 weather conditions
    
    $.ajax({
        url: weatherURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    }).then(function (weatherRes) {
        
        // UPDATE MAIN WEATHER CARD
        // console.log(weatherRes);
        $("#cityName").append(weatherRes.name);
        $("#temp").append(weatherRes.main.temp);
        $("#humid").append(weatherRes.main.humidity);
        $("#wind").append(weatherRes.wind.speed);
        
        //ajax call to get the UV info
        $.ajax({
            url: uvURL + formatUVQuery(weatherRes.coord.lon, weatherRes.coord.lat) + API_KEY,
            method: "GET"
        }).then(function (uvRes) {
            
            // UPDATE UV INDEX FOR MAIN WEATHER CARD
            $("#uv").append(uvRes.value);
            // console.log(uvRes);
        });
        
        var iconPath = weatherRes.weather[0].icon;
        var iconURL = "https://openweathermap.org/img/wn/"+ iconPath + "@2x.png";

        $.ajax({
            url: iconURL,
            method: "GET"
        }).then(function (iconRes) {
            
            var IMG1 = $("img")
            IMG1.append(iconRes)
            $("#icon").append(IMG1);
            console.log(IMG1)
        }); 
    });
    

    var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q=";

     // ajax call to get 5-day forecast
    $.ajax({
        url: forecastURL + QUERY + unitsURL + API_KEY,
        method: "GET"
    }).then(function (forecastRes) {

        // UPDATE FORECAST CARDS
        console.log(forecastRes); 
        var dateOne = moment().add(1, 'days').format('L');      
        $("#date1").append(dateOne);

        // $("#icon1").append(forecastRes.list[2].weaher[0].icon);
        $("#temp1").append(forecastRes.list[2].main.temp);
        $("#humid1").append(forecastRes.list[2].main.humidity);

        var dateTwo = moment().add(2, 'days').format('L');      
        $("#date2").append(dateTwo);
        // $("#icon1").append(forecastRes.list[2].weaher[0].icon);
        $("#temp2").append(forecastRes.list[9].main.temp);
        $("#humid2").append(forecastRes.list[9].main.humidity);

        var dateThree = moment().add(3, 'days').format('L');      
        $("#date3").append(dateThree);
        // $("#icon1").append(forecastRes.list[2].weaher[0].icon);
        $("#temp3").append(forecastRes.list[17].main.temp);
        $("#humid3").append(forecastRes.list[17].main.humidity);
        
        var dateFour = moment().add(4, 'days').format('L');      
        $("#date4").append(dateFour);
        // $("#icon1").append(forecastRes.list[2].weaher[0].icon);
        $("#temp4").append(forecastRes.list[25].main.temp);
        $("#humid4").append(forecastRes.list[25].main.humidity);

        var dateFive = moment().add(5, 'days').format('L');      
        $("#date5").append(dateFive);
        // $("#icon1").append(forecastRes.list[2].weaher[0].icon);
        $("#temp5").append(forecastRes.list[33].main.temp);
        $("#humid5").append(forecastRes.list[33].main.humidity);
    }); 
});


function saveSearch() {
    for (i = 0; i < cities.length; i++) {
      newCity = $("<li></li>").append(cities[i]).addClass("list-group-item");
      $("#city-list").append(newCity); 

      clearText();
    }
    function clearText(){
        search = $("#search-input");
        if (this.defaultValue===this.value) {
        search.value = "";
        }
    }
  }

// clear input after the data is retrieved
    // $("#search-input").value("");

    // $("#clear").click(function (e) {
    //     e.preventDefault();
    //     $("#scoreList").css('display', 'none');
    //     localStorage.clear();
    //   });