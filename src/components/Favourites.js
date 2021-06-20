import React from "react";
import "../App.css";
import "@shopify/polaris/dist/styles.css";
import { DisplayText } from "@shopify/polaris";

function App() {
  // JSX разметка
  return (
    <div>
      <main>
        <DisplayText size="extraLarge">Избранные города</DisplayText>
      </main>
    </div>
  );
}

export default App;
