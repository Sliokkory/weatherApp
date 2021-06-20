import React, { useState } from "react";
import "../App.css";
import "@shopify/polaris/dist/styles.css";
import { DisplayText } from "@shopify/polaris";


// доступ к API сервиса погоды
const api = {
  key: "c7616da4b68205c2f3ae73df2c31d177",
  base: "http://api.openweathermap.org/data/2.5/",
};

function App() {
  //Добавление в избранное
  function addFav(city) {
    localStorage.getItem("Counter")
      ? localStorage.setItem("Counter", localStorage.getItem("Counter") + 1)
      : localStorage.setItem("Counter", 1);
    localStorage.setItem(localStorage.getItem("Counter"), city);
    console.log(localStorage.getItem("Counter"));
  }

  // действия при изменении города в поле ввода
  const [city, setCity] = useState("");

  // действия с данными погоды
  const [weather, setWeather] = useState({});

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос
        .then((res) => res.json()) // ответ преобразуем в json
        .then((result) => {
          // работаем с результатом
          setWeather(result);
          setCity("");
          console.log(result);
        });
    }
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
      <DisplayText size="extraLarge">Погода в городе: {weather.name}</DisplayText>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Поиск..."
            onChange={(e) => setCity(e.target.value)}
            value={city}
            onKeyPress={search}
          />
        </div>
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
            <button onClick={addFav(city)}>Добавить в избранное</button>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
