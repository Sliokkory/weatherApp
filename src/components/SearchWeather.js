import React, { useState } from "react";
import "../App.css";
import "@shopify/polaris/dist/styles.css";
import Favourites from "./Favourites"
import { DisplayText, Button, TextContainer } from "@shopify/polaris";

// доступ к API сервиса погоды
const api = {
  key: "4d03d2d9918bb01778570f2e2bd54d41",
  base: "http://api.openweathermap.org/data/2.5/",
};

let counter = 0;

function App() {
  // действия при изменении города в поле ввода
  const [city, setCity] = useState("");

  // действия с данными погоды
  const [weather, setWeather] = useState({});

  // обработчик, который срабатывает когда нажата клавиша Enter
  const search = (evt) => {
    if (evt.key === "Enter") {
      counter = 0;
      if (counter === 0) {
        fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`) // отправляем запрос
          .then((res) => res.json()) // ответ преобразуем в json
          .then((result) => {
            // работаем с результатом
            setWeather(result);
            setCity("");
            console.log(result);
            counter = 1;
          });
      }
    }
  };

  //Добавление в избранное
  function addFav() {
    if (!localStorage.getItem(weather.name)) {
      localStorage.setItem(weather.name, " ");
      Favourites();
    } else {
      console.log("Город уже добавлен в избранное");
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
        <DisplayText size="extraLarge">
          Погода в городе: {weather.name}
        </DisplayText>
        <input
          type="text"
          className="search-bar"
          placeholder="Узнать погоду в городе: ..."
          onChange={(e) => setCity(e.target.value)}
          value={city}
          onKeyPress={search}
        />
        {typeof weather.main != "undefined" ? (
          <div>
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
            <Button onClick={addFav}>Добавить в избранное</Button>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
