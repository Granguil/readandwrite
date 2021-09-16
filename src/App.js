import React from "react";
import { NavigationBrowser, NavigationRouter } from "navigation";

//Get the CSS of custom modules
import "navigation/dist/index.css";
import "header/dist/index.css";
import "card/dist/index.css";
import "toaster/dist/index.css";
import "button/dist/index.css";
import "explorer/dist/index.css";
import "popup/dist/index.css";
import Main from "./Main";

function App() {
  return (
    <NavigationBrowser>
      <NavigationRouter link="/">
        <Main />
      </NavigationRouter>
    </NavigationBrowser>
  );
}

export default App;
