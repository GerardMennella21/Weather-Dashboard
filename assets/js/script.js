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
                                const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
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
                                $("#UV").addClass("badge")
                                if (uvIndex < 4) {
                                    $("#UV").removeClass("badge-danger")
                                    $("#UV").removeClass("badge-warning")
                                    $("#UV").addClass("badge-success")
                                } else if (uvIndex < 8) {
                                    $("#UV").removeClass("badge-danger")
                                    $("#UV").removeClass("badge-success")
                                    $("#UV").addClass("badge-warning")
                                } else {
                                    $("#UV").removeClass("badge-success")
                                    $("#UV").removeClass("badge-warning")
                                    $("#UV").addClass("badge-danger")
                                }
                                // Reset Forecast
                                $("#forecastSection").empty()
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
                                    var fcTemp = Math.floor(data.daily[i].temp.day)
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

// Search History Storage/Array
var searchHistory = JSON.parse(localStorage.getItem("history")) || []

// Search City Function
$("#searchBtn").on("click", function() {    
    // Variables
    var searchedCity = $("#searchedCity").val()
    var pastSearch = document.createElement("li")
    var deleteBtn = document.createElement("button")
    var index = searchHistory.length
    // Attributes
    deleteBtn.setAttribute("type", "button")
    pastSearch.setAttribute("id", index)
    // Classes
    $(deleteBtn).addClass("btn btn-danger btn-outline-light border border-light deleteBtn")
    $(pastSearch).addClass("list-group-item text-light bg-dark text-center border border-light pastSearch")
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
        var deleteID = $(this).parent().attr("id")
        $(this).parent("li").remove()
        searchHistory.splice(deleteID , 1) 
        localStorage.setItem("history", JSON.stringify(searchHistory))
        displayHistory()
    })
    // Local Storage
    searchHistory.push(searchedCity)
    localStorage.setItem("history", JSON.stringify(searchHistory))
    index++
    // Reset Search
    $("#searchedCity").val("")
})

// Display Search History Function
var displayHistory = function() {
    // Clear History
    $("#searchHistory").empty()
    // Generate History
    for (i = 0; i < searchHistory.length; i++) {
        // Variables
        var historyCity = searchHistory[i]
        var historySearch = document.createElement("li")
        var historyDelete = document.createElement("button")
        // Attributes
        historyDelete.setAttribute("type", "button")
        historySearch.setAttribute("id", [i])
        // Classes
        $(historyDelete).addClass("btn btn-danger btn-outline-light border border-light")
        $(historySearch).addClass("list-group-item text-light bg-dark text-center border border-light pastSearch")
        // Inner HTML
        historyDelete.innerHTML = '<i class="fa fa-trash" aria-hidden="true"></i>'
        historySearch.innerHTML = historyCity + "<br />"
        // Append
        $("#searchHistory").append(historySearch)
        $(historySearch).append(historyDelete)
        // History Click Function
        $(historySearch).on("click", function() {
            getCityWeather($(this).text())
        })
        // Delete Click Function
        $(historyDelete).on("click", function() {
            $(this).parent("li").remove()
            var deleteID = $(this).parent().attr("id")
            searchHistory.splice(deleteID, 1)
            localStorage.setItem("history", JSON.stringify(searchHistory))
            displayHistory()
        })
    }
}


displayHistory()




