import React, { useState, useEffect, useLayoutEffect } from "react";
import TodoNav from "../TodoNav/index";
import TodoInput from "../TodoInput/index";
import iconCross from "../../../images/icon-cross.svg";
import IconCheck from "../../../images/icon-check.svg";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [numberTodos, setNumberTodos] = useState(todos.length);
  const [filterTodos, setFilterTodos] = useState("all");

  /* Call function to change todo visible  */
  useEffect(() => {
    if (filterTodos === "all") {
      for (const todo of todos) {
        document.getElementById(todo.id).classList.remove("--hidden");
      }
    } else if (filterTodos === "active") {
      filterClassHidden(false);
    } else if (filterTodos === "completed") {
      filterClassHidden(true);
    }
  }, [filterTodos]);

  /* Local Strorage  */
  useEffect(() => {
    if (localStorage.getItem("todos") != null) {
      const localTodos = localStorage.getItem("todos");
      setTodos(JSON.parse(localTodos));
    }
  }, []);

  /* call function changeNumberTodos and change the localStorage */
  useEffect(() => {
    changeNumberTodos();
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  /* Change number todo when a click completed*/
  const changeNumberTodos = () => {
    let i = 0;
    for (const todo of todos) {
      if (todo.completed === false) {
        i++;
      }
    }
    setNumberTodos(i);
  };

  const addTodo = (value) => {
    const todo = {
      value,
      completed: false,
      id: value.replace(/ /g, "") + Math.random(),
    };
    setTodos([todo, ...todos]);
  };

  const removeTodo = (e) => {
    const id = e.target.parentNode.id;
    const array = todos.filter((value) => value.id !== id);
    setTodos(array);
  };

  const clearCompletedTodo = () => {
    const array = todos.filter((value) => value.completed === false);
    setTodos(array);
  };

  const showCross = (e) => {
    if (e.target === e.currentTarget) {
      let div = e.target;
      let divRemove = div.querySelector(".todo__content-remove");
      divRemove.style.opacity = 1;
    } else {
      return null;
    }
  };
  const showCross2 = (e) => {
    e.target.style.opacity = 1;
  };

  const hideCross = (e) => {
    if (e.target === e.currentTarget) {
      let div = e.target;
      let divRemove = div.querySelector(".todo__content-remove");
      divRemove.style.opacity = 0;
    } else {
      return null;
    }
  };

  /* Call function to change state completed  */
  const completedTodo = (e) => {
    const id = e.target.parentNode.parentNode.id;
    for (const todo of todos) {
      if (todo.id === id && todo.completed === false) {
        changeStatusCompleted(todo, true);
      } else if (todo.id === id && todo.completed === true) {
        changeStatusCompleted(todo, false);
      }
    }
  };
  /* Change the state completed in todos  and call a function to change NumberTodo left */
  const changeStatusCompleted = (todo, choice) => {
    const index = todos.indexOf(todo);
    const objectTodo = todos[index];
    objectTodo.completed = choice ? true : false;
    todos.splice(index, 1, objectTodo);
    setTodos(todos);
    changeNumberTodos();
    //LocalStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  /* hide elements compared to the filter */
  const filterClassHidden = (mode) => {
    mode ? true : false;
    for (const todo of todos) {
      if (todo.completed === mode) {
        document.getElementById(todo.id).classList.remove("--hidden");
      } else {
        document.getElementById(todo.id).classList.add("--hidden");
      }
    }
  };

  const dragStart = (e) => {
    e.target.classList.add("--dragging");
  };

  const dragEnd = (e) => {
    const todoDrag = document.querySelector(".--dragging");
    const array = todos.filter((elmt) => elmt.id !== todoDrag.id);
    const todo = todos.find((element) => element.id === todoDrag.id);
    let position =
      todoDrag.previousSibling != null
        ? array.findIndex((elmt) => elmt.id === todoDrag.previousSibling.id) + 1
        : 0;
    array.splice(position, 0, todo);
    setTodos(array);
    e.target.classList.remove("--dragging");
  };

  const dragOver = (e) => {
    e.preventDefault();
    const todoDrag = document.querySelector(".--dragging");
    const afterElement = getDragAfterElement(e.clientY);
    if (afterElement === null) {
      document.querySelector(".todo__container").appendChild(todoDrag);
    } else {
      document
        .querySelector(".todo__container")
        .insertBefore(todoDrag, afterElement);
    }
  };

  const getDragAfterElement = (y) => {
    const draggableElements = [
      ...document.querySelectorAll(".todo__content:not(.--dragging)"),
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  let todoContent = todos.map((todo) => {
    const classCompleted =
      todo.completed === true ? "todo__content --completed" : "todo__content";
    return (
      <div
        className={classCompleted}
        onMouseEnter={showCross}
        onMouseLeave={hideCross}
        key={todo.id}
        id={todo.id}
        draggable={todos.length > 1 && filterTodos === "all" ? "true" : "false"}
        onDragStart={dragStart}
        onDragEnd={dragEnd}
      >
        <div className="todo__content-completed">
          <img
            src={IconCheck}
            onClick={completedTodo}
            style={{ opacity: 0 }}
            draggable="false"
          />
        </div>
        <div className="todo__content-element">{todo.value}</div>
        <img
          className="todo__content-remove"
          onMouseOver={showCross2}
          src={iconCross}
          onClick={removeTodo}
          style={{ opacity: 0 }}
          draggable="false"
        />
      </div>
    );
  });

  return (
    <div className="todo">
      <div className="todo__input">
        <TodoInput inputValue={addTodo} />
      </div>
      <div className="todo__container" onDragOver={dragOver}>
        {todoContent}
      </div>
      <div className="todo__nav">
        <TodoNav
          numberTodos={numberTodos}
          filterTodos={(value) => setFilterTodos(value)}
          clearCompleted={clearCompletedTodo}
        />
      </div>
    </div>
  );
};

export default Todo;
