import React, { useState } from "react";
import "./App.css";
import "@shopify/polaris/dist/styles.css";
import { DisplayText } from "@shopify/polaris";
import axios from "axios";


// доступ к API сервиса погоды
const api = {
  key: "c7616da4b68205c2f3ae73df2c31d177",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/posts',
    params: {
      user_key_id: 'USER_KEY_ID',
    },
    data: {
      title: 'new_title',
      body: 'new_body',
      userId: 'userid'
    },
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(function(response) {
    console.log('Ответ сервера успешно получен!');
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
  var url =
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=";
  var token = "7612dc8608916f867f8fc970a07bc7c079254fb1";
  var query = fetch("https://ipapi.co/json/");

  var options = {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Token " + token,
    },
  };
  // действия при изменении города в поле ввода
  fetch(url + query, options)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  const city = "Белгород";

  // действия с данными погоды
  const [weather, setWeather] = useState({});

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = (evt) => {
    fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос
      .then((res) => res.json()) // ответ преобразуем в json
      .then((result) => {
        // работаем с результатом
        setWeather(result);
        console.log(result);
      });
  };

  // форматирование даты
  const format_date = (d) => {
    let months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    let days = [
      "Воскресенье",
      "Понедельник",
      "Вторник",
      "Среда",
      "Четверг",
      "Пятница",
      "Суббота",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  // JSX разметка
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <DisplayText size="extraLarge">
          Погода в вашем городе:
          {search()}
        </DisplayText>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{format_date(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
