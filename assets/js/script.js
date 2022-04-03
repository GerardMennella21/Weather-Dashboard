// API Key
var apiKey = "41989238adf8ec3a4c8e5fcc3599969c"

// Function to retrieve and display weather and forecast
var getCityWeather = function(currentCity){

    // Primary API Url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + apiKey

    // API Retrieval
    fetch(apiUrl)
        // API Response
        .then(function(response) {
            // If/Else Statment for valid city input
            if (response.ok) {
                // Data Retrieval
                response.json().then(function(data) {                    
                    // Coord Variables
                    var lat = data.coord.lat
                    var lon = data.coord.lon                    
                    // Secondary API Url
                    var altApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely,alerts&units=imperial&appid=" + apiKey
                    fetch(altApiUrl)
                        // Secondary API Response
                        .then(function(response){
                            // Secondary Api Data Retrieval
                            response.json().then(function(data) {
                                // Date Variables
                                var date = new Date(data.current.dt * 1000)
                                const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
                                var day = weekdays[date.getDay()]
                                var dd = date.getDate()
                                var mm = date.getMonth()
                                var yyyy = date.getFullYear()
                                // IMG Variables
                                var weatherPic = data.current.weather[0].icon
                                var weatherPicAlt = data.current.weather[0].description
                                // Temp, Wind, Humidty, UV Variables
                                var temp = Math.floor(data.current.temp)
                                var tempLike = Math.floor(data.current.feels_like)
                                var wind = data.current.wind_speed
                                var humidity = data.current.humidity
                                var uvIndex = data.current.uvi
                                // Weather Display
                                $("#currentCity").text(currentCity)
                                $("#currentDate").text("(" + day + ", " + mm + "/" + dd + "/" + yyyy + ")")
                                $("#weatherPic").attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
                                $("#weatherPic").attr("alt", weatherPicAlt)
                                $("#temp").text("Temp: " + temp + " \xB0F, Feels Like " + tempLike + "\xB0F")
                                $("#wind").text("Wind: " + wind + "MPH")
                                $("#humidity").text("Humidity: " + humidity + "%")
                                $("#UV").text("UV: " + uvIndex)
                                // UV Color
                                if (uvIndex < 4) {
                                    $("#UV").addClass("badge badge-success")
                                } else if (uvIndex < 8) {
                                    $("#UV").addClass("badge badge-warning")
                                } else {
                                    $("#UV").addClass("badge badge-danger")
                                }
                                // Reset Forecast
                                var fcSect = document.querySelector("#forecastSection")
                                fcSect.innerHTML = ""
                                // 5 Day Forecast Loop
                                for (i = 1; i < 6; i++) {
                                    // Forecast Date 
                                    var forecastDate = new Date(data.daily[i].dt * 1000)
                                    const wkdays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat",]
                                    var fcDay = wkdays[forecastDate.getDay()]
                                    var fcDD = forecastDate.getDate()
                                    var fcMM = forecastDate.getMonth()
                                    var fcYYYY = forecastDate.getFullYear()
                                    // Forecast IMG Variables
                                    var fcWeatherPic = data.daily[i].weather[0].icon
                                    var fcWeatherPicAlt = data.daily[i].weather[0].description
                                    // Forecast Temp, Wind, Humidity Variables
                                    var fcTemp = data.daily[i].temp.day
                                    var fcWind = data.daily[i].wind_speed
                                    var fcHumidity = data.daily[i].humidity
                                    // Forecast Element Variables
                                    var fcCardEL = document.createElement("div")
                                    var fcBodyEL = document.createElement("div")
                                    var fcDateEL = document.createElement("h5")
                                    var fcTempEL = document.createElement("p")
                                    var fcWindEL = document.createElement("p")
                                    var fcHumidityEL = document.createElement("p")
                                    var fcImgEL = document.createElement("img")
                                    // Forecast Classes & Attributes
                                    $(fcCardEL).addClass("card text-center mt-5 mb-5 bg-dark text-light border-light")
                                    $(fcBodyEL).addClass("card-body")
                                    $(fcDateEL).addClass("card-title")
                                    $(fcTempEL).addClass("card-text")
                                    $(fcWindEL).addClass("card-text")
                                    $(fcHumidityEL).addClass("card-text")
                                    $(fcImgEL).addClass("card-img-top border border-light bg-primary")
                                    $(fcImgEL).attr("src", "https://openweathermap.org/img/wn/" + fcWeatherPic + "@2x.png")
                                    $(fcImgEL).attr("alt", fcWeatherPicAlt)
                                    // Forecast Data Population
                                    fcDateEL.innerHTML = fcDay + "<br />" + fcMM + "/" + fcDD + "/" + fcYYYY
                                    fcTempEL.innerHTML = "Temp: " + fcTemp + " \xB0F"
                                    fcWindEL.innerHTML = "Wind: " + fcWind + " MPH"
                                    fcHumidityEL.innerHTML = "Humidity: " + fcHumidity + "%"
                                    // Forecast Elements Append
                                    $(fcBodyEL).append(fcDateEL, fcTempEL, fcWindEL, fcHumidityEL)
                                    $(fcCardEL).append(fcImgEL, fcBodyEL)
                                    $("#forecastSection").append(fcCardEL)
                                }
                            })
                        })
                })
            } else {
                // Invalid entry alert
                alert("Invalid Entry, Please Try Again!")
            }    
        })
}

// Search City Function
$("#searchBtn").on("click", function() {    
    // Variables
    var searchedCity = $("#searchedCity").val()
    var pastSearch = document.createElement("li")
    var deleteBtn = document.createElement("button")
    // Attributes
    deleteBtn.setAttribute("id", "deleteBtn")
    deleteBtn.setAttribute("type", "button")
    pastSearch.setAttribute("id", "pastSearch")
    // Classes
    $(deleteBtn).addClass("btn btn-danger btn-outline-light border border-light")
    $(pastSearch).addClass("list-group-item text-light bg-dark text-center border border-light")
    // Weather Function Call
    getCityWeather(searchedCity)
    // Inner HTML
    deleteBtn.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
    pastSearch.innerHTML = searchedCity + "<br />"
    // Append
    $("#searchHistory").append(pastSearch)
    $(pastSearch).append(deleteBtn)
    // History Click Function
    $(pastSearch).on("click", function() {
        getCityWeather($(this).text())
    })
    // Delete Click Function
    $(deleteBtn).on("click", function() {
        $(this).parent("li").remove()
    })
    // Reset Search
    $("#searchedCity").val("")
})



