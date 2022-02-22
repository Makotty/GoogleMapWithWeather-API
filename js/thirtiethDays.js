window.onload = function () {
  alert(
    "このページでは対応した都市を取得するために、「地図のクリックや住所の検索→緯度経度取得→今日の天気予報APIで都市取得→取得した都市を30日間の予報APIのパラメータに渡す→30日間の天気予報が取得できる」といった流れで一回の実行に同じAPIの通信を2回行うので何回も押すとエラーになります。あと、使用できるAPI通信回数の上限を超えてしまいます。慎重にお願いします"
  );
};

function thirtiethDays(value) {
  // Open Weather MAP (5日間の天気予報）
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://community-open-weather-map.p.rapidapi.com/climate/month?q=${value}`,
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
      var date = new Date(list[i].dt * 1000);
      const formatDate = (date) => {
        let formatted_date =
          date.getFullYear() +
          "年" +
          (date.getMonth() + 1) +
          "月" +
          date.getDate() +
          "日";
        return formatted_date;
      };

      document.getElementById("weather").innerHTML += `
        <div class="area newmo">
          <h2>${formatDate(date)}の気候</h2>

          <h3>気温</h3>
          <div class="flex-spacebetween">
            <h4>平均気温</h4>
            <p>${Math.round(celsius(list[i].temp.average) * 10) / 10}℃</p>
          </div>
          <div class="flex-spacebetween">
            <h4>平均最高気温</h4>
            <p>${Math.round(celsius(list[i].temp.average_max) * 10) / 10}℃</p>
          </div>
          <div class="flex-spacebetween">
            <h4>平均最低気温</h4>
            <p>${Math.round(celsius(list[i].temp.average_min) * 10) / 10}℃</p>
          </div>
          <div class="flex-spacebetween">
            <h4>記録最高気温</h4>
            <p>${Math.round(celsius(list[i].temp.record_max) * 10) / 10}℃</p>
          </div>
          <div class="flex-spacebetween mb-16">
            <h4>記録最低気温</h4>
            <p>${Math.round(celsius(list[i].temp.record_min) * 10) / 10}℃</p>
          </div>

          <div class="flex-spacebetween mb-16">
            <h3>湿度</h3>
            <p>${list[i].humidity}%</p>
          </div>

          <div class="flex-spacebetween">
            <h3>大気圧</h3>
            <p>${list[i].pressure}hPa</p>
          </div>


          <div class="flex-spacebetween mb-16">
            <h3>風速</h3>
            <p>${list[i].wind_speed}m/sec</p>
          </div>


        </div>
        `;
    }
  });
}
