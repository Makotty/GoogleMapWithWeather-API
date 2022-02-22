function nowWeather(lat, lng) {
  // Open Weather MAP (今の天気)
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://community-open-weather-map.p.rapidapi.com/weather?&lat=${lat}&lon=${lng}&units=metric`,
    method: "GET",
    headers: {
      "x-rapidapi-key": "{APIKEY}",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);

    var main = response.main;
    var icon = response.weather[0].icon;
    var temp = main.temp;
    var temp_min = main.temp_min;
    var temp_max = main.temp_max;
    var humidity = main.humidity;
    var pressure = main.pressure;
    var grnd_level = main.grnd_level;
    var sea_level = main.sea_level;

    var wind = response.wind;

    var clouds = response.clouds.all;

    var rain = response.rain;

    var snow = response.snow;

    document.getElementById("nowWeather").textContent = weatherChange(response);

    document
      .getElementById("nowWeather_img")
      .setAttribute("src", `http://openweathermap.org/img/w/${icon}.png`);

    document.getElementById("nowTemp").textContent = `${temp}℃`;

    document.getElementById("nowMinTemp").textContent = `${temp_min}℃`;

    document.getElementById("nowMaxTemp").textContent = `${temp_max}℃`;

    document.getElementById("nowHumidity").textContent = `${humidity}%`;

    document.getElementById("nowWindSpeed").textContent = `${wind.speed}m/sec`;

    document.getElementById("nowClouds").textContent = `${clouds}%`;

    if (rain) {
      if (rain["1h"]) {
        document.getElementById("nowRain1h").textContent = `${rain["1h"]}mm`;
      } else {
        document.getElementById("nowRain1h").textContent =
          "過去1時間、雨が降っていません";
      }

      if (rain["3h"]) {
        document.getElementById("nowRain3h").textContent = `${rain["3h"]}mm`;
      } else {
        document.getElementById("nowRain3h").textContent =
          "過去3時間、雨が降っていません";
      }
    } else {
      document.getElementById("nowRain1h").textContent =
        "過去1時間、雨が降っていません";

      document.getElementById("nowRain3h").textContent =
        "過去3時間、雨が降っていません";
    }

    if (snow) {
      if (snow["1h"]) {
        document.getElementById("nowSnow1h").textContent = `${snow["1h"]}mm`;
      } else {
        document.getElementById("nowSnow1h").textContent =
          "過去1時間、雪が降っていません";
      }
      if (snow["3h"]) {
        document.getElementById("nowSnow3h").textContent = `${snow["3h"]}mm`;
      } else {
        document.getElementById("nowSnow3h").textContent =
          "過去3時間、雪が降っていません";
      }
    } else {
      document.getElementById("nowSnow1h").textContent =
        "過去1時間、雪が降っていません";

      document.getElementById("nowSnow3h").textContent =
        "過去3時間、雪が降っていません";
    }

    document.getElementById("nowPressure").textContent = `${pressure}hPa`;

    if (grnd_level) {
      document.getElementById("nowGrndLevel").textContent = `${grnd_level}hPa`;
    } else {
      document.getElementById("nowGrndLevel").textContent =
        "データがありません";
    }

    if (sea_level) {
      document.getElementById("nowSeaLevel").textContent = `${sea_level}hPa`;
    } else {
      document.getElementById("nowSeaLevel").textContent = "データがありません";
    }
  });
}
