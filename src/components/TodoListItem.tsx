// import React from 'react';
// import Button from '@material-ui/core/Button';
// import '../TodoListItem.css'

// interface TodoListItemProps {
//     todo: Todo;
//     toggleTodo: ToggleTodo;
//     removeTodo: RemoveTodo;
// }

// export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleTodo, removeTodo }) => {  
//     return (
//         <li> 
//             <label className={todo.complete ? 'complete': undefined}> 
//                 < input type="checkbox" checked={todo.complete} onChange={() => toggleTodo(todo)} /> 
//                 {todo.text} 
//             </label>
//             <Button variant="contained" color="secondary" onClick={()=>removeTodo(todo.id)}>X</Button>
//         </li >
//     );
// };
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
    toggleTodo: ToggleTodo;
    removeTodo: RemoveTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({ todo, toggleTodo, removeTodo }) => {  
    return (
        <ListItem>
            <ListItemAvatar>
            <Checkbox
                edge="start"
                checked={todo.complete}
                tabIndex={-1}
                disableRipple
                onChange={() => toggleTodo(todo)}
                // inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemAvatar>
            <ListItemText
                primary={todo.text}
                secondary={todo.complete ? 'complete': undefined}
            />
            <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={()=>removeTodo(todo.id)}>
                    <DeleteIcon /> 
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
};