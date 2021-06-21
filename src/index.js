import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SearchWeather from "./components/SearchWeather";
import Favourites from "./components/Favourites";
import enTranslations from "@shopify/polaris/locales/en.json";
import { AppProvider, Page, Card } from "@shopify/polaris";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <Page title="Weather Application">
        <Card sectioned>
          <Favourites />
        </Card>
        <Card sectioned>
          <App />
        </Card>
        <Card sectioned>
          <SearchWeather />
        </Card>
      </Page>
    </AppProvider>
    ,
  </React.StrictMode>,
  document.getElementById("root")
);
