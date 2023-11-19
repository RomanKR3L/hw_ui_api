const apiKey = "768e0288406389e6e0f9840659813b24";
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-image i");
const weather = document.querySelector(".weather");
const errorText = document.querySelector(".error");
async function getTimeInCity(city1) {
    const response = await fetch(apiUrl + city1 + `&appid=${apiKey}`);
    if (response.status === 404) {
        errorText.style.display = "block";
        weather.style.display = "none";
    } else {
        const data = await response.json();
        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "&#8451";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        if (data.weather[0].main == "Clear") weatherIcon.className = "fa-solid fa-sun";
        else if (data.weather[0].main == "Rain") weatherIcon.className = "fa-solid fa-cloud-rain";
        else if (data.weather[0].main == "Mist") weatherIcon.className = "fa-solid fa-cloud-mist";
        else if (data.weather[0].main == "Drizzle") weatherIcon.className = "fa-solid fa-cloud-drizzle";
        weather.style.display = "block";
        errorText.style.display = "none";
    }
}
searchButton.addEventListener("click", ()=>{
    getTimeInCity(searchInput.value);
    searchInput.value = "";
});
searchInput.addEventListener("keydown", (event)=>{
    if (event.keyCode === 13) {
        getTimeInCity(searchInput.value);
        searchInput.value = "";
    }
});

//# sourceMappingURL=index_4.05565a93.js.map