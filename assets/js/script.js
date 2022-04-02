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

                    // Date Variables
                    var date = new Date(data.dt * 1000)
                    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
                    var day = weekdays[date.getDay()]
                    var dd = date.getDate()
                    var mm = date.getMonth()
                    var yyyy = date.getFullYear()

                    // IMG Variables
                    var weatherPic = data.weather[0].icon
                    var weatherPicAlt = data.weather[0].description

                    // Temp, Wind, & Humidty Variables
                    var temp = data.main.temp
                    var tempLike = data.main.feels_like
                    var wind = data.wind.speed

                    // Function to Convert Kelvin to Fahrenheit
                    var tempConvert = function(K) {
                        return Math.floor((K - 273.15) * 1.8 + 32);
                    }
                    
                    // Weather Display
                    $("#currentCity").text(data.name + " (" + day + ", " + mm + "/" + dd + "/" + yyyy + ")")
                    $("#weatherPic").attr("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png")
                    $("#weatherPic").attr("alt", weatherPicAlt)
                    $("#temp").text("Temp: " + tempConvert(temp) + " \xB0F, Feels Like " + tempConvert(tempLike) + "\xB0F")
                    $("#wind").text("Wind: " + wind + "MPH")
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
    pastSearch.innerHTML = searchedCity
    // Append
    $("#searchHistory").append(pastSearch)
    $(pastSearch).append(deleteBtn)
    // Click Functions
    $(pastSearch).on("click", function() {
        getCityWeather($(this).text())
    })
    $(deleteBtn).on("click", function() {
        $(this).parent("li").remove()
    })
    // Reset Search
    $("#searchedCity").val("")
})



