"use strict";
// API KEY
// c5b49a10ab49bdd6a95a168ebe9b52ec
///////////TO DO////////////////
/* 

2.Function that used api to get weather information
3. Function that converts f to celcius
4. A way to display to different object properties and they appear on the app i.e temp, conditions, wind.
5. Function that display the date of today in same way as demo date
6. Function that changes the bg image to match the conditions
7.Add error handling to API calls, catch etc.
*/
const searchBox = document.querySelector(".search-box");

let lat;
let lng;

const dateOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "long",
};

const date = new Date().toDateString();
console.log(date);

const rendorWeather = function (data) {
  let html = `
        <section class="location">
          <div class="city">${data.name}, ${data.sys.country}</div>
          <div class="date">${date}</div>
        </section>
        <div class="current">
          <div class="temp">${Math.trunc(data.main.temp)}<span>°c</span></div>
          <div class="weather">${data.weather[0].main}</div>
          <div class="hi-low">${Math.trunc(
            data.main.temp_min
          )}°c / ${Math.trunc(data.main.temp_max)}°c</div>
        </div>
    `;

  document.querySelector("main").innerHTML = html;
};

const getWeather = function (lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c5b49a10ab49bdd6a95a168ebe9b52ec&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      rendorWeather(data);
    });
};

// 1. Function that converts textbox input to lat and long
const getLocation = function (city) {
  const request = fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=c5b49a10ab49bdd6a95a168ebe9b52ec`
  )
    .then((res) => res.json())
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      getWeather(lat, lon);
    })
    .catch((error) => console.log(`A Problem Occured 😪 ${error.message}`));
};

searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const city = searchBox.value;
    getLocation(city);
    searchBox.value = "";
  }
});
