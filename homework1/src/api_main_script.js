const apiKey = '768e0288406389e6e0f9840659813b24';

function getTimeInCity() {
    const cityInput = document.getElementById('cityInput');
    const resultParagraph = document.getElementById('result');
    const searchHistoryList = document.getElementById('searchHistory');
    const city = cityInput.value;

    // Получаем координаты города
    const coordinatesUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    fetch(coordinatesUrl)
        .then(response => response.json())
        .then(data => {
            const coordinates = data.coord;
            const latitude = coordinates.lat;
            const longitude = coordinates.lon;

            // Получаем таймзону для города
            const timezoneUrl = `https://worldtimeapi.org/api/timezone?lat=${latitude}&lon=${longitude}`;
            fetch(timezoneUrl)
                .then(response => response.json())
                .then(timezoneData => {
                    // Используем первую найденную таймзону (можно дополнительно обработать, если есть несколько)
                    const timezone = timezoneData[0];

                    // Получаем время по таймзоне города
                    const timeUrl = `https://worldtimeapi.org/api/timezone/${timezone}`;
                    fetch(timeUrl)
                        .then(response => response.json())
                        .then(timeData => {
                            const time = new Date(timeData.utc_datetime);
                            resultParagraph.textContent = `Current time in city ${city}: ${time}`;
                            
                            // Сохраняем город в локальное хранилище
                            let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
                            searchHistory.push(city);
                            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));

                            // Выводим историю поиска городов
                            displaySearchHistory();
                        })
                        .catch(error => {
                            resultParagraph.textContent = `Couldn't get time for the city ${city}: ${error}`;
                        });
                })
                .catch(error => {
                    resultParagraph.textContent = `Couldn't get timezone for the city ${city}: ${error}`;
                });
        })
        .catch(error => {
            resultParagraph.textContent = `Couldn't get coordinates for the city ${city}: ${error}`;
        });
}

function displaySearchHistory() {
    const searchHistoryList = document.getElementById('searchHistory');
    searchHistoryList.innerHTML = '';

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    searchHistory.forEach(city => {
        const listItem = document.createElement('li');
        listItem.textContent = city;
        searchHistoryList.appendChild(listItem);
    });
}

// Инициализация: выводим историю поиска при загрузке страницы
displaySearchHistory();