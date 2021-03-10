import React from "react";
import { render } from "react-dom";
import "./src/css/style";
import Header from "./src/Components/Header/index";
import Main from "./src/Components/Main/index";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Main />
    </div>
  );
};

render(<App />, document.getElementById("app"));
