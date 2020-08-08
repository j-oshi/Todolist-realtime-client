import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';

interface TodoListItemProps {
    todo: Todo;
    removeTodo: RemoveTodo;
    toggleTodo: ToggleTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, removeTodo, toggleTodo }) => { 
    return (
        <ListItem>
            <ListItemAvatar>
            <Checkbox
                edge="start"
                checked={todo.task === 1 ? true : false}
                tabIndex={-1}
                disableRipple
                onChange={() => toggleTodo(todo)}
              />
            </ListItemAvatar>
            <ListItemText
                primary={todo.name}
                style={{ textDecoration : todo.task === 1 ? 'line-through' : 'none' }} 
            />
            <ListItemSecondaryAction>
                <IconButton color="secondary" edge="end" aria-label="delete" 
                    onClick={()=>window.confirm("Are you sure you wish to delete this item?") && removeTodo(todo.id)}
                >
                    <DeleteIcon /> 
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};