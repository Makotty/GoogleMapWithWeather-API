var map;
// 地図を入れるオブジェクトmapをグローバルに定義する。
var marker;
// マーカーを入れるオブジェクトmarkerをグローバルに定義する。
var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(
    $("#mymap")[0], // マップを出力
    // map = new google.maps.Map(document.getElementById('mymap'),
    {
      center: { lat: 35.173646, lng: 136.92355 }, // マップの中心の初期設定
      zoom: 15, // マップの拡大倍率の指定
      mapTypeId: google.maps.MapTypeId.SATELLITE, // マップを航空写真に変更
    }
  );

  marker = new google.maps.Marker({
    position: { lat: 35.173646, lng: 136.92355 }, // マーカーの座標の初期設定
    map: map,
    // title: "", // マーカーの名前
    animation: google.maps.Animation.DROP, // 上から落ちてくるようなアニメーションの追加
    // icon: {
    //   url: "images/marker.png", // マーカーをオリジナルの画像に変更
    //   scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
    // },
    // label: {
    //   text: "", // テキストを表示できる(住所など)
    // },
  });
  marker.setPosition({ lat: 35.173646, lng: 136.92355 });
  marker.setMap(map);

  google.maps.event.addListener(map, "click", function (e) {
    // クリックしたとき(Clickイベント)
    marker.setPosition(e.latLng); // クリックした場所の座標をpositionに設定。
    map.setCenter(e.latLng); // マップの中心をクリックした場所の座標に設定。

    var getCenter = map.getCenter();
    var lat = getCenter.lat();
    var lng = getCenter.lng();

    document.getElementById("lat").textContent = lat;
    document.getElementById("lng").textContent = lng;

    if (typeof nowWeather === "function") {
      nowWeather(lat, lng);
    }

    if (typeof fiveDaysWeather === "function") {
      fiveDaysWeather(lat, lng);
    }

    if (typeof thirtiethDays === "function") {
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
        thirtiethDays(response.name);
      });
    }

    //緯度・経度をLatLngクラスに変換します。
    var latLngInput = new google.maps.LatLng(lat, lng);

    //Google Maps APIのジオコーダを使います。
    var geocoder = new google.maps.Geocoder();

    //ジオコーダのgeocodeを実行します。
    //第１引数のリクエストパラメータにlatLngプロパティを設定します。
    //第２引数はコールバック関数です。取得結果を処理します。
    geocoder.geocode(
      {
        latLng: latLngInput,
      },
      function (results, status) {
        var address = "";

        if (status == google.maps.GeocoderStatus.OK) {
          //取得が成功した場合

          //住所を取得します。
          address = results[0].formatted_address;
        } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
          alert("住所が見つかりませんでした。");
        } else if (status == google.maps.GeocoderStatus.ERROR) {
          alert("サーバ接続に失敗しました。");
        } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
          alert("リクエストが無効でした。");
        } else if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          alert("リクエストの制限回数を超えました。");
        } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
          alert("サービスが使えない状態でした。");
        } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
          alert("原因不明のエラーが発生しました。");
        }

        //住所の結果表示をします。
        document.getElementById("addressOutput").textContent = address;
      }
    );
  });
}

function geo() {
  var address = document.getElementById("address").value;

  if (address) {
    marker.setMap(null);
    if (geocoder) {
      geocoder.geocode({ address: address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          map.setCenter(results[0].geometry.location);
          marker = new google.maps.Marker({
            // マーカーの出力
            position: results[0].geometry.location, // マーカーの座標の初期設定
            map: map,
            // title: "", // マーカーの名前
            animation: google.maps.Animation.DROP, // 上から落ちてくるようなアニメーションの追加
            // icon: {
            //   url: "images/marker.png", // マーカーをオリジナルの画像に変更
            //   scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
            // },
            // label: {
            // text: "", // テキストを表示できる(住所など)
            // },
          });
          marker.setMap(map);

          var getCenter = map.getCenter();
          var lat = getCenter.lat();
          var lng = getCenter.lng();

          document.getElementById("lat").textContent = lat;
          document.getElementById("lng").textContent = lng;

          //緯度・経度をLatLngクラスに変換します。
          var latLngInput = new google.maps.LatLng(lat, lng);

          //ジオコーダのgeocodeを実行します。
          //第１引数のリクエストパラメータにlatLngプロパティを設定します。
          //第２引数はコールバック関数です。取得結果を処理します。
          geocoder.geocode(
            {
              latLng: latLngInput,
            },
            function (results, status) {
              var address = "";

              if (status == google.maps.GeocoderStatus.OK) {
                //取得が成功した場合

                //住所を取得します。
                address = results[0].formatted_address;
              } else if (status == google.maps.GeocoderStatus.ZERO_RESULTS) {
                alert("住所が見つかりませんでした。");
              } else if (status == google.maps.GeocoderStatus.ERROR) {
                alert("サーバ接続に失敗しました。");
              } else if (status == google.maps.GeocoderStatus.INVALID_REQUEST) {
                alert("リクエストが無効でした。");
              } else if (
                status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT
              ) {
                alert("リクエストの制限回数を超えました。");
              } else if (status == google.maps.GeocoderStatus.REQUEST_DENIED) {
                alert("サービスが使えない状態でした。");
              } else if (status == google.maps.GeocoderStatus.UNKNOWN_ERROR) {
                alert("原因不明のエラーが発生しました。");
              }

              //住所の結果表示をします。
              document.getElementById("addressOutput").textContent = address;
            }
          );

          if (typeof nowWeather === "function") {
            nowWeather(lat, lng);
          }

          if (typeof fiveDaysWeather === "function") {
            fiveDaysWeather(lat, lng);
          }

          if (typeof thirtiethDays === "function") {
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
              thirtiethDays(response.name);
            });
          }
        }
      });
    }
  } else {
    alert("住所を入力してください");
  }
}

// function reset() {
//   marker.setMap(null);

//   map.setCenter({ lat: 35.173646, lng: 136.92355 });
//   marker = new google.maps.Marker({
//     // マーカーの出力
//     position: { lat: 35.173646, lng: 136.92355 }, // マーカーの座標の初期設定
//     map: map,
//     // title: "", // マーカーの名前
//     animation: google.maps.Animation.DROP, // 上から落ちてくるようなアニメーションの追加
//     // icon: {
//     //   url: "images/marker.png", // マーカーをオリジナルの画像に変更
//     //   scaledSize: new google.maps.Size(50, 50), // マーカーの画像のサイズを指定
//     // },
//     label: {
//       // text: "", // テキストを表示できる(住所など)
//     },
//   });
//   marker.setMap(map);
// }
