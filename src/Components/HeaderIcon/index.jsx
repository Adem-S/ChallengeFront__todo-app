import React from "react";
import IconLight from "../../../images/icon-sun.svg";
import IconDark from "../../../images/icon-moon.svg";

const HeaderIcon = ({ light }) => {
  return light ? <img src={IconDark} /> : <img src={IconLight} />;
};

export default HeaderIcon;
