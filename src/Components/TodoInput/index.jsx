import React, { useState } from "react";

const TodoInput = (props) => {
  const [todoValue, setTodoValue] = useState("");

  const addTodo = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      props.inputValue(todoValue);
      setTodoValue("");
    }
  };
  return (
    <>
      <div></div>
      <input
        onKeyUp={addTodo}
        value={todoValue}
        onChange={(e) => setTodoValue(e.target.value)}
        maxLength={70}
        placeholder="Create a new todo.."
      />
    </>
  );
};

export default TodoInput;
