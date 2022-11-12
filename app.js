const inputBox = document.querySelector(".main__input");
const textbox = document.querySelector("#main__input--text");
const submitButton = document.querySelector("#submit-button");
const weatherContainer = document.querySelector(
  ".main__weather-display-container"
);
const displayCity = document.querySelector(".display__title");
const displayTemp = document.querySelector(".display__temp");
const displayFeelsLike = document.querySelector(".display__feels-like");
const displayCloud = document.querySelector(".cloud-cover");
const displayImg = document.querySelector(".cloud-img");
const displaySunrise = document.querySelector("#sunrise");
const displaySunset = document.querySelector("#sunset");
const errorMsg = document.querySelector(".error-message");

let cityName, curTemp, feelsLike, sunrise, sunset, cloudCover, weatherImg;

inputBox.addEventListener("click", getUserInput);

function getUserInput(e) {
  e.preventDefault();
  errorMsg.style.opacity = 0;
  weatherContainer.style.opacity = 0;

  if (e.target.id == "submit-button") {
    if (!textbox.value) {
      errorMsg.style.opacity = 1;
    } else {
      let userCity = textbox.value;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${userCity},ca&id=524901&appid=2f5fc75e2778d38e8b6c67d84ddbc88d`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => getData(data))
        .catch((err) => error());

      function error() {
        errorMsg.style.opacity = 1;
      }

      textbox.value = "";

      function getData(data) {
        cityName = data.name;
        console.log(cityName);

        curTemp = data.main.temp;
        curTemp = Math.round(curTemp - 273.15);
        console.log(curTemp);

        feelsLike = data.main.feels_like;
        feelsLike = Math.round(feelsLike - 273.15);
        console.log(feelsLike);

        sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
          "en-US",
          {
            hour: "numeric",
            minute: "numeric",
          }
        );
        console.log(sunrise);

        sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        });
        console.log(sunset);

        cloudCover = data.weather[0].main;
        console.log(cloudCover);

        weatherImg = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        console.log(weatherImg);

        displayCity.textContent = cityName;

        displayTemp.textContent = `${curTemp}°C`;

        displayFeelsLike.textContent = `Feels like: ${feelsLike}°C`;

        displayCloud.textContent = cloudCover;

        displayImg.setAttribute("src", weatherImg);

        displaySunrise.textContent = `Sunrise: ${sunrise}`;
        displaySunset.textContent = `Sunset: ${sunset}`;

        weatherContainer.style.opacity = 1;
      }
    }
  }
}
