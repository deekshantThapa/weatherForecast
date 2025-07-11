// api key from accu weather api
const apiKey = 'dbOjz6ZN7rlkkxvGrlxfbGbOnUqO2M0W';

// getting city detail
const getCityDetail = async (city) => {

    const url = 'https://dataservice.accuweather.com/locations/v1/cities/search/';
    const query = `?apikey=${apiKey}&q=${city}`;

    const response = await fetch(url + query);
    const parsedData = await response.json();

    return parsedData[0];
};

// getting weather detail
const getWeatherDetail = async (id) => {

    const url = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${apiKey}`;

    const response = await fetch(url + query);
    const parsedData = await response.json();

    return parsedData[0];
};