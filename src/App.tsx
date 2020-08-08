import React, { useEffect, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import socketIOClient from "socket.io-client";

import ButtonAppBar from './components/Header';
import { TodoList } from './components/TodoList';
import { AddTodoform } from './components/AddTodoForm';

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const App: React.FC = () => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'INITIAL':
        return [...action.todo];
      case 'ADD_TODO':
        return [...state, action.newTodo];
      case 'TOGGLE_TODO':
        return [...action.newTodos];
      case 'REMOVE_TODO':
        return state.filter(todo => todo.id !== action.id);
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    socket.on("showrows", (todo) => {
      dispatch({ type: 'INITIAL', todo })
    });
  }, [])

  const addTodo: AddTodo = todoText => {
    const newTodo = { id: uuidv4(), name: todoText, task: 0 };
    if (todoText.trim() !== "") {
      dispatch({ type: 'ADD_TODO', newTodo })
      socket.emit("add todo", newTodo);
    }
  };

  const removeTodo: RemoveTodo = id => {
    dispatch({ type: 'REMOVE_TODO', id })
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
    dispatch({ type: 'TOGGLE_TODO', newTodos })
  };

  return (
    <React.Fragment>
      <ButtonAppBar />
      <TodoList todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />;
      <AddTodoform addTodo={addTodo} />
    </React.Fragment>
  )
};

export default App;
