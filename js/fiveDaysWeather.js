function fiveDaysWeather(lat, lng) {
  // Open Weather MAP (5日間の天気予報）
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://community-open-weather-map.p.rapidapi.com/forecast?lat=${lat}&lon=${lng}&units=metric`,
    method: "GET",
    headers: {
      "x-rapidapi-key": "{APIKEY}",
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var list = response.list;
    for (var i = 0; i < list.length; i++) {
      var dateArray = list[i].dt_txt.split(" ");
      var date = dateArray[0].split("-");
      var year = date[0];
      var month = Number(date[1]);
      var day = Number(date[2]);
      var dateTimeArray = dateArray[1].split(":");
      var dateTime = Number(dateTimeArray[0]);

      document.getElementById("weather").innerHTML += `
      <div class="area newmo">
        <h2>${year}年${month}月${day}日${dateTime}時の天気</h2>
        <div class="flex-spacebetween mb-16">
          <h3>天気</h3>
          <div class="flex-end">
            <p>${weatherChange(list[i])}</p>
            <img src="http://openweathermap.org/img/w/${
              list[i].weather[0].icon
            }.png" />
          </div>
        </div>
        <div class="flex-spacebetween mb-16">
          <h3>雲量</h3>
          <p>${list[i].clouds.all}%</p>
        </div>

        <div class="flex-spacebetween mb-16">
          <h3>降水確率</h3>
          <p>${list[i].pop}%</p>
        </div>

        <div class="flex-spacebetween">
          <h3>気温</h3>
          <p>${list[i].main.temp}℃</p>
        </div>

        <div class="flex-spacebetween">
          <h4>最低気温</h4>
          <p>${list[i].main.temp_min}℃</p>
        </div>

        <div class="flex-spacebetween mb-16">
          <h4>最高気温</h4>
          <p>${list[i].main.temp_max}℃</p>
        </div>

        <div class="flex-spacebetween mb-16">
          <h3>湿度</h3>
          <p>${list[i].main.humidity}%</p>
        </div>

        <div class="flex-spacebetween mb-16">
          <h3>風速</h3>
          <p>${list[i].wind.speed}m/sec</p>
        </div>

        <div class="flex-spacebetween">
          <h3>大気圧</h3>
          <p>${list[i].main.pressure}hPa</p>
        </div>

        <div class="flex-spacebetween">
          <h4>地表面の大気圧</h4>
          <p>${list[i].main.sea_level}hPa</p>
        </div>

        <div class="flex-spacebetween">
          <h4>海面の大気圧</h4>
          <p>${list[i].main.grnd_level}hPa</p>
        </div>

      </div>`;
    }
  });
}
