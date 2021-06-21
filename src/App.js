import React, { useState } from "react";
import "./App.css";
import "@shopify/polaris/dist/styles.css";
import { DisplayText, TextContainer } from "@shopify/polaris";

// доступ к API сервиса погоды
const api = {
  key: "4d03d2d9918bb01778570f2e2bd54d41",
  base: "http://api.openweathermap.org/data/2.5/",
};

let counter = 0;

let city;

function App() {
  function currentGeo() {
    if (navigator.geolocation) {
      // Геолокация доступна
      navigator.geolocation.getCurrentPosition(function (position) {
        // Текущие координаты.
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;
        fetch(
          `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${api.key}`
        ) // отправляем запрос
          .then((res) => res.json()) // ответ преобразуем в json
          .then((result) => {
            // работаем с результатом
            city = result[0].name;
            getWaether();
          });
      });
    } else {
      // Геолокация не доступна
      console.log(
        "Геолокация не доступна, для отображения погоды разрешите доступ к отслеживанию текущего местоположения"
      );
    }
  }

  // действия с данными погоды
  const [weather, setWeather] = useState({});

  function getWaether(env) {
    if (counter === 0) {
      fetch(
        `${api.base}weather?q=${city}&units=metric&limit=1&appid=${api.key}`
      ) // отправляем запрос
        .then((res) => res.json()) // ответ преобразуем в json
        .then((result) => {
          // работаем с результатом
          setWeather(result);
          console.log(result);
        });
      counter = 1;
    }
  }

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
    <div>
      <main>
        <TextContainer>
          <div className="head">
          <DisplayText size="extraLarge">
            Погода в вашем городе:
            {currentGeo()}
          </DisplayText>
          </div>
        </TextContainer>
        {typeof weather.main != "undefined" ? (
          <TextContainer>
            <DisplayText size="medium">
              {weather.name}, {weather.sys.country}
            </DisplayText>
            <DisplayText size="small">{format_date(new Date())}</DisplayText>
            <DisplayText size="small">
              {Math.round(weather.main.temp)}°c
            </DisplayText>
            <DisplayText size="small">{weather.weather[0].main}</DisplayText>
          </TextContainer>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
