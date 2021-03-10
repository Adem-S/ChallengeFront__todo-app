import React, { useState, useEffect } from "react";
import HeaderIcon from "../HeaderIcon/index";

const Header = () => {
  const localStorageTheme = localStorage.getItem("theme");
  const [modeLight, setModeLight] = useState(
    localStorageTheme === "light" || localStorageTheme === null ? true : false
  );

  useEffect(() => {
    if (modeLight) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  }, [modeLight]);
  return (
    <>
      <div className="header header--light">
        <div className="header__image"></div>
        <h2 className="header__title">Todo</h2>
        <div className="header__logo" onClick={() => setModeLight(!modeLight)}>
          <HeaderIcon light={modeLight} />
        </div>
      </div>
    </>
  );
};

export default Header;
