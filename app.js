
function updateData(weather, city) {

    if (weather.temp == undefined) {
        alert("Invalid Location !");
    }
    else {
        /* Date and Time */
        const getdateTime = new Date();
        const currDate = getdateTime.toDateString();
        const fullDate = currDate.slice(4);
        const Day = currDate.slice(0, 3) + 'day, ';

        let hour = getdateTime.getHours();
        let format = hour >= 12 ? ' PM' : ' AM';
        const time = getdateTime.toTimeString().slice(0, 5) + format;

        const dateP = document.querySelector("#date");
        dateP.innerHTML = fullDate;

        const day = document.querySelector("#daytime");
        day.innerHTML = Day + time;

        /* Weather Data Update */
        const cityTitle = document.querySelector("#citytitle");
        cityTitle.innerHTML = `Weather Details, ${city}`;

        const Temprature = document.querySelector("#temp");
        Temprature.innerHTML = `${weather.temp} &#176; C`;

        const Location = document.querySelector("#location");
        Location.innerText = city;

        const WindSpeed = document.querySelector("#windspeed");
        WindSpeed.innerText = `${weather.wind_speed} Km/h`;

        const Humidity = document.querySelector("#humidity");
        Humidity.innerText = `${weather.humidity} %`;

        const Feel = document.querySelector("#feel");
        Feel.innerHTML = `${weather.temp} &#176; C`;

        const Pct = document.querySelector("#pct");
        Pct.innerHTML = weather.cloud_pct;

        const minTemp = document.querySelector("#mintemp");
        minTemp.innerHTML = `${weather.min_temp} &#176; C`;

        const maxTemp = document.querySelector("#maxtemp");
        maxTemp.innerHTML = `${weather.max_temp} &#176; C`;

        const windDeg = document.querySelector("#windegree");
        windDeg.innerHTML = `${weather.wind_degrees}`;

        /* Convert time of sunrise */
        const timestamp = weather.sunrise;
        let date = new Date(timestamp * 1000);
        let hours = date.getHours();
        let minutes = "0" + date.getMinutes();
        let seconds = "0" + date.getSeconds();
        let formattedTime = hours + ':' + minutes.substr(-2) + ' am';

        const sunrise = document.querySelector("#sunrise");
        sunrise.innerHTML = formattedTime;


        /* Convert time of sunset */
        const timestamp2 = weather.sunset;
        let date2 = new Date(timestamp2 * 1000);
        let hours2 = date2.getHours();
        let minutes2 = "0" + date2.getMinutes();
        let seconds2 = "0" + date2.getSeconds();
        let formattedTime2 = hours2 + ':' + minutes2.substr(-2) + ' pm';

        const sunset = document.querySelector("#sunset");
        sunset.innerHTML = formattedTime2;
    }
}


async function getWeather(city) {

    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '7e894ab668mshd5b079f71fa9a8dp1a843bjsn2da249536775',
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        let weather = JSON.parse(result);
        updateData(weather, city);

    } catch (error) {
        alert("Try Again !");
    }
}


const inputCity = document.querySelector("#city");
const searchBtn = document.querySelector(".search button");

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let city = inputCity.value;
    getWeather(city);
})

let defaultcity = "Mumbai";
window.addEventListener("load", getWeather(defaultcity));