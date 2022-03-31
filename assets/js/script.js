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
                    // Data Declarations
                    var lat = data.coord.lat
                    var lon = data.coord.lon
                    var date = new Date(data.dt * 1000)

                    $("#currentCity").text(date)
                    console.log(date)
                    console.log(lat, lon)
                })
            } else {
                // Invalid entry alert
                alert("Invalid Entry, Please Try Again!")
            }    
        })
}

$("#searchBtn").on("click", function() {
    var searchedCity = $("#searchedCity").val()
    var pastSearch = document.createElement("li")
    pastSearch.setAttribute("id", "pastSearch")
    $(pastSearch).addClass("list-group-item text-light bg-dark")
    pastSearch.textContent = searchedCity
    getCityWeather(searchedCity)
    $("#searchHistory").append(pastSearch)
    $(pastSearch).on("click", function() {
        getCityWeather($(this).text())
    })
})

