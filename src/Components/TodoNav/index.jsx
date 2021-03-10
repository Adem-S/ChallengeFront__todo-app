import React from "react";

const TodoNav = (props) => {
  const styleFilter = (e) => {
    if (e.target !== e.currentTarget) {
      const filterItem = document.querySelector(".--filter");
      filterItem && filterItem.removeAttribute("class");
      e.target.classList.add("--filter");
    }
  };

  return (
    <>
      <div className="todo__nav-number">{props.numberTodos} items left</div>
      <div className="todo__nav-filter" onClick={styleFilter}>
        <div onClick={() => props.filterTodos("all")} className="--filter">
          All
        </div>
        <div onClick={() => props.filterTodos("active")}>Active</div>
        <div onClick={() => props.filterTodos("completed")}>Completed</div>
      </div>
      <div className="todo__nav-clear" onClick={() => props.clearCompleted()}>
        Clear Completed
      </div>
    </>
  );
};

export default TodoNav;
