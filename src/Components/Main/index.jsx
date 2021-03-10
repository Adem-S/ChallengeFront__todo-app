import React from "react";
import Todo from "../Todo/index";

const Main = () => {
  return (
    <div className="main__content">
      <Todo />
      <p className="main__footer">Drag and drop to reorder list</p>
    </div>
  );
};

export default Main;
