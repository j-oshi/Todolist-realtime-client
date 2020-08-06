import React, { MouseEvent } from 'react';
import '../TodoListItem.css'

interface TodoListItemProps {
    todo: Todo;
    toggleTodo: ToggleTodo;
    removeTodo: RemoveTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleTodo, removeTodo }) => {  
    return (
        < li > 
            <label className={todo.complete ? 'complete': undefined}> 
                < input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo)} /> 
                {todo.text} 
            </label>
            <button onClick={()=>removeTodo(todo.id)}>X</button>
        </li >
    );
};