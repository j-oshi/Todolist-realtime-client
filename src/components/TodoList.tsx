import React from 'react';
import { TodoListItem } from './TodoListItem';

interface TodolistProps {
    todos: Array<Todo>;
    toggleTodo: ToggleTodo;
    removeTodo: RemoveTodo;
}

export const TodoList: React.FC<TodolistProps> = ({ todos, toggleTodo, removeTodo }) => {
    return (
        <ul>
            {todos.map(todo => {
                return <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
            })}
        </ul>
    );
};