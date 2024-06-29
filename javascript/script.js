let barIcon = document.getElementById("barIcon");
let resNav = document.getElementById("resNav");
let menuItems = document.querySelectorAll(".main-navigation a, .res-navigation a");
let currentLocation = window.location.href.split("/").pop();
let forecasTbl = document.getElementById("forecasTbl");

barIcon.addEventListener("click", resNavOpen);

window.addEventListener("resize", function() {
    if (window.innerWidth > 990) {
        resNav.classList.remove("d-block");
        resNav.classList.add("d-none");
    }
});

function resNavOpen () {
    if (resNav.classList.contains("d-none")) {
        resNav.classList.remove("d-none");
        resNav.classList.add("d-block");
    } else {
        resNav.classList.remove("d-block");
        resNav.classList.add("d-none");
    }
}

for (let i = 0; i < menuItems.length; i++) {
    if (menuItems[i].getAttribute("href") === currentLocation) {
        menuItems[i].classList.add("active");
    }
}

const API_BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "4156b8ed5e9946e1ae8164159242606";
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function fetchWeather(city) {
    const response = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=3`)
    const data = await response.json();
    console.log(data);
    displayWeather(data);
}

searchButton.addEventListener("click", function() {
    let cityName = searchInput.value;
    if (cityName) {
        fetchWeather(cityName);
    }
});

function displayWeather(data) {
    var date = new Date();
    const options = { weekday: 'long' };
    let today = date.toLocaleDateString('en-US', options);
    let tomorrow = new Date();
    tomorrow.setDate(date.getDate() + 1);
    const formattedTomorrow = tomorrow.toLocaleDateString('en-US', options);
    let nextDay = new Date();
    nextDay.setDate(date.getDate() + 2);
    const formattedNextDay = nextDay.toLocaleDateString('en-US', options);
    let currentHour = new Date().getHours();
    const todayDate = new Date();
    const todayOptions = {month: 'long', day: 'numeric' };
    const formattedtodayDate = todayDate.toLocaleDateString('en-US', todayOptions);

    let forecasTbl = document.getElementById("forecasTbl");
    forecasTbl.innerHTML = `<div class="row">
                    <div class="col-lg-4 col-md-12 today-h tbl-header forth-bg-color main-gray py-2 px-4 d-flex justify-content-between">
                        <span>${today}</span>
                        <span>${formattedtodayDate}</span>
                    </div>
                    <div class="col-lg-4 col-md-12 py-2  tomorrow-h tbl-header fifth-bg-color d-flex justify-content-center align-items-center main-gray">
                        <span>${formattedTomorrow}</span>
                    </div>
                    <div class="col-lg-4 col-md-12 py-2 next-day tbl-header forth-bg-color d-flex justify-content-center align-items-center main-gray">
                        <span>${formattedNextDay}</span>
                    </div>
                    <div class="tbl-body today-b col-lg-4 col-md-12 second-bg-color py-2 px-4">
                        <h3 class="main-gray fs-6 my-3">${data.location.country}</h3>
                        <h2 class="temp text-white fs-huge">${data.forecast.forecastday[0].day.avgtemp_c}<sup>o</sup>C</h2>
                        <span><img src="${data.forecast.forecastday[0].hour[23].condition.icon}" alt="${data.forecast.forecastday[0].day.condition.text}" class="weather-icon"></span>
                        <h6 class="main-blue fw-light">${data.forecast.forecastday[0].hour[currentHour].condition.text}</h6>
                        <span class="main-gray fs-7"><i class="fa-solid fa-umbrella fa-rotate-by main-gray me-1" style="--fa-rotate-angle: 60deg;"></i>${data.forecast.forecastday[0].hour[currentHour].will_it_rain}%</span>
                        <span class="main-gray ms-4 fs-7"><i class="fa-solid fa-wind main-gray me-1"></i>${data.forecast.forecastday[0].day.maxwind_kph}km/h</span>
                        <span class="main-gray ms-4 fs-7"><i class="fa-regular fa-compass fa-rotate-by main-gray me-1" style="--fa-rotate-angle: 45deg;"></i>${data.forecast.forecastday[0].hour[currentHour].wind_dir}</span>
                    </div>
                    <div class="tbl-body tomorrow-b col-lg-4 col-md-12 third-bg-color py-2 px-4 text-center">
                        <span><img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}" class="weather-icon py-4"></span>
                        <h2 class="temp text-white fs-4">${data.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</h2>
                        <h2 class="low-deg main-gray fs-6">${data.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></h2>
                        <h6 class="main-blue mt-4 fw-light">${data.forecast.forecastday[1].day.condition.text}</h6>
                    </div>
                    <div class="tbl-body next-day-b col-lg-4 col-md-12 second-bg-color py-2 px-4 text-center">
                        <span><img src="${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}" class="weather-icon py-4"></span>
                        <h2 class="temp text-white fs-4">${data.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</h2>
                        <h2 class="low-deg main-gray fs-6">${data.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></h2>
                        <h6 class="main-blue mt-4 fw-light">${data.forecast.forecastday[2].day.condition.text}</h6>
                    </div>
                </div>    
            </div>`
} 

window.onload = function() {
    fetchWeather("istanbul");
};
