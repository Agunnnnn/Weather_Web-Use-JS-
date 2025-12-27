const  ApiKey = "" //PUT YOUR API KEY HERE;
const ApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const SerachBox = document.querySelector(".search input")
const SerachBtn = document.querySelector(".search button")

async function checkWeather(city){
    const response = await fetch(ApiUrl + encodeURIComponent(city) + `&appid=${ApiKey}`);
    if (!response.ok) {
        document.querySelector(".city").innerHTML = "City not found";
        document.querySelector(".temp").innerHTML = "";
        document.querySelector(".humidity").innerHTML = "";
        document.querySelector(".wind").innerHTML = "";
        return;
    }
    var data = await response.json();


    console.log(data);
    console.log('weather main:', data.weather[0].main, 'icon:', data.weather[0].icon);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round( data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

    const main = data.weather[0].main;
    const iconCode = data.weather[0].icon;

    const WeatherIcon = document.querySelector(".Weather-icon");

    if (!WeatherIcon) {
        console.error("Weather icon element not found");
    } else {
        WeatherIcon.onerror = function() {
            console.error('Failed to load image:', WeatherIcon.src);
            WeatherIcon.src = 'weather-icons/images/svg/weather_cover.svg';
            WeatherIcon.alt = 'Default weather';
        };

        if(main === "Clouds"){
            WeatherIcon.src ="weather-icons/images/svg/b_3_very_cloudy.svg";
            WeatherIcon.alt = 'Cloudy';
        } else if(main === "Clear"){
            WeatherIcon.src = "weather-icons/images/svg/b_1_partly_cloudy.svg";
            WeatherIcon.alt = 'Clear';
        } else if(main === "Rain" || main === "Thunderstorm"){
            WeatherIcon.src = "weather-icons/images/svg/g_4_waterdrop.svg";
            WeatherIcon.alt = 'Rain';
        } else if(main === "Drizzle"){
            WeatherIcon.src = "weather-icons/images/svg/g_2_very_stormy.svg";
            WeatherIcon.alt = 'Drizzle';
        } else if(main === "Mist" || main === "Fog"){
            WeatherIcon.src = "weather-icons/images/svg/d_4_fog.svg";
            WeatherIcon.alt = 'Mist/Fog';
        } else {
            WeatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            WeatherIcon.alt = 'Weather';
        }
    }
    
}

SerachBtn.addEventListener("click", () => {
    checkWeather(SerachBox.value);

})

SerachBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        checkWeather(SerachBox.value);
    }
})