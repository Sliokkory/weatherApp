import React from "react";
import "../App.css";
import "@shopify/polaris/dist/styles.css";
import { DisplayText } from "@shopify/polaris";

function Fovourites() {
  // JSX разметка
  return (
    <div>
      <main>
        <div className="head">
          <DisplayText className="head" size="extraLarge">
            Избранные города
          </DisplayText>
        </div>
        <DisplayText size="large">{[Object.keys(localStorage)]}</DisplayText>
      </main>
    </div>
  );
}

export default Fovourites;
