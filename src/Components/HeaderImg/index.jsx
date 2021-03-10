import React, { useState } from "react";
import imageDark from "../../../images/bg-desktop-dark.jpg";
import imageLight from "../../../images/bg-desktop-light.jpg";

const HeaderImg = ({ light }) => {
  const mode = useState(light);
  return mode ? <img src={imageLight} /> : <img src={imageDark} />;
};

export default HeaderImg;
