import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import socketIOClient from "socket.io-client";

import ButtonAppBar from './components/Header';
import { TodoList } from './components/TodoList';
import { AddTodoform } from './components/AddTodoForm';

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);
const LOCAL_STORAGE_KEY = "react-todo-list-todos";

const App: React.FC = () => {
  const [todos, setTodos] = useState([] as Array<Todo>);
  useEffect(() => {

    socket.on("showrows", data => {
      setTodos(data);
    });

    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
  }, []);

  const addTodo: AddTodo = todoText => {
    const newTodo = { id: uuidv4(), name: todoText, task: 0 };
    if (todoText.trim() !== "") {
      setTodos([...todos, newTodo]);
      socket.emit("add todo", newTodo);
    }
  };

  const removeTodo: RemoveTodo = id => {
    setTodos(todos.filter(todo => todo.id !== id));
    socket.emit("remove todo", id);
  };

  const toggleTodo: ToggleTodo = selectedTodo => {
    const newTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        socket.emit("update todo", {
          ...todo,
          task: todo.task === 1 ? 0 : 1
        });
        return {
          ...todo,
          task: todo.task === 1 ? 0 : 1
        };
      }
      return todo;
    });
    setTodos(newTodos)
  };

  // useEffect(() => {
  //   if (localStorage.getItem(LOCAL_STORAGE_KEY)){
  //     const storeTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '');

  //     if (storeTodos) {
  //       setTodos(storeTodos)
  //       console.log(storeTodos)
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  // }, [todos]);


  return (
    <React.Fragment>
      <ButtonAppBar />
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />;
      <AddTodoform addTodo={addTodo} />
    </React.Fragment>
  )
};

export default App;
