import React, { useState } from "react"

import { v4 as uuid } from 'uuid'
import "./styles.css";

/*
  INSTRUCTIONS:
  Create a "todo" app with the following criteria.
    1. The user can add new todo items
    2. The user can remove todo items
*/

export default function Todo () {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    setTodos((oldTodos) => [...oldTodos, {
      value: inputValue,
      id: uuid()
    }])
    setInputValue('')
  }
  const removeTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== id))
  } 
  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={inputValue} placeholder='New Todo' onChange={(e) => setInputValue(e.target.value)}/>
        <button className="todosBtn" onClick={addTodo}>Add</button>
      </form>
      <br />
      <ul>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              <span>{todo.value}</span>
              <button className="todosBtn" type="button" onClick={() => removeTodo(todo.id)}>X</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
