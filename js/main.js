const apiKey = "21b33fd780b898195cf7d24b7be50c85";

// 'https://openweathermap.org/img/w/${weatherIcon}.png'
const weatherBody = document.querySelector(".weather__body");

async function getWeather(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=${apiKey}`
  );
  if (response.ok) {
    const result = response.json();
    console.log(result);
    return result;
  } else {
    return false;
  }
}

const buttons = document.querySelector(".weather__btns");
const btn = document.querySelectorAll(".weather__btn");

buttons.addEventListener("click", async function (event) {
  weatherBody.innerHTML = `<div class='loading' ><img src="images/loading.gif" alt=""></div>`;

  if (event.target.classList.contains("weather__btn")) {
    btn.forEach((e) => {
      e.classList.remove("active");
    });
    event.target.closest("button").classList.add("active");

    console.log("OK!");
    console.log(event.target.innerText);
    const data = await getWeather(event.target.dataset.location);
    if (data === false) {
      weatherBody.innerHTML = "Server Error!!((";
    } else {
      console.log(data);

      //Constants
      const feelsLike = Math.round(data.main.feels_like * 10) / 10;
      const temp = Math.round(data.main.temp * 10) / 10;
      const seaLevel = data.main.sea_level;
      const location = data.name;
      const state = data.weather[0].main;
      const icon = data.weather[0].icon;
      const windDeg = data.wind.deg;
      const windSpeed = data.wind.speed;
      const template = `
    <div class="weather__main-info">
      <h1 class="weather__location">${location}</h1>
      <p class="weather__state">${state}</p>
      <p class="weather__temp"> ${temp + " °C"}</p>
      <p class="weather__feels-like">Feels like: ${feelsLike} °C</p>
    </div>
    <div class="weather__icon">
      <img src="https://openweathermap.org/img/w/${icon}.png" alt="" class="weather__icon-img">
    </div>
    <div class="weather__more-info">
      <div class="weather__more-info-body">
        <div class="weather__wind">
          <div class="weather__wind-direction">Wind direction: ${windDeg + "°"
        }</div>
          <div class="weather__wind-speed">Speed: ${windSpeed} mps</div>
        </div>
        <p class="weather__sea-level">Sea level: ${seaLevel == undefined ? "No info" : seaLevel + "m"
        }</p>
      </div>
    </div>
    `;
      weatherBody.innerHTML = template;
    }
  }
});
