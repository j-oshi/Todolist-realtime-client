import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import io from "socket.io-client";

import { TodoList } from './components/TodoList';
import { AddTodoform } from './components/AddTodoForm';

const ENDPOINT = "http://127.0.0.1:4001";
const LOCAL_STORAGE_KEY = "react-todo-list-todos";
const initialTodos = [{id: 1, text: "Walk the dog", complete: true}, {id: 2, text: "Walk the dogsd", complete: true}]

const App: React.FC = () => {
  const [response, setResponse] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const socket = io(ENDPOINT);

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_KEY)){
      const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');

      if (storeTodos) {
        setTodos(storeTodos)
        console.log(storeTodos)
      }
    }


  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return {
          ...todo,
          complete: !todo.complete
        };
      }
      return todo;
    });
    setTodos(newTodos)
  }

  const addTodo: AddTodo = newTodo => {
    const newList = { id: uuidv4(), text: newTodo, complete: false }
    newTodo.trim() !== "" && setTodos([...todos, newList]);
    socket.emit("add list", newList);
    console.log(newList);
  }

  const removeTodo: RemoveTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  return (
    <React.Fragment>
      <h1>Todo List {response}</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} removeTodo={removeTodo} />;
      <AddTodoform addTodo={addTodo} />
    </React.Fragment>
  )
};

export default App;
