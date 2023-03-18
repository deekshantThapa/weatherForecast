const form = document.querySelector('.search-form');
const weatherContent = document.querySelector('.weather-content');
const weatherInfo = document.querySelector('.weather-info');
const weatherImg = document.querySelector('.weather-image img');

const updateCity = async (city) => {
    
    const cityDetail = await getCityDetail(city);
    const weatherDetail = await getWeatherDetail(cityDetail.Key);

    return {cityDetail, weatherDetail};
};

const updateUI = (data) => {

    const city = data.cityDetail;
    const weather = data.weatherDetail;

    weatherContent.innerHTML = `
    <h3 class="city-name">${city.EnglishName}</h3>
    <h2 class="weather-condition">${weather.WeatherText}</h2>
    <div class="temperature">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg; C</span>
    </div>
    `

    if(weather.IsDayTime == true){
        weatherImg.setAttribute('src', 'day-image.jpg');
    }
    else{
        weatherImg.setAttribute('src', 'night-image.jfif');
    }

};

form.addEventListener('submit', e => {

    e.preventDefault();

    let userSearch = form.search.value.trim();
    form.reset();

    if(userSearch.length > 0){
        
        updateCity(userSearch)
        .then(data => updateUI(data))
        .catch(error => console.log(error));

        if(weatherInfo.classList.contains('d-none')){
            weatherInfo.classList.remove('d-none');
        }

        // setting local storage
        localStorage.setItem('city', userSearch);
    }

});

// ------------------------  Related to local storage --------------------------------------------

// checking if there is city value stored in local storage or not, if there is, showing the weather automatically of last city value user searched when browser gets refreshed or reopened

if(localStorage.getItem('city')){
    updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(error => console.log(error));

    if(weatherInfo.classList.contains('d-none')){
        weatherInfo.classList.remove('d-none');
    }
};