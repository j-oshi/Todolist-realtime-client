// import React from 'react';
// import { TodoListItem } from './TodoListItem';

// interface TodolistProps {
//     todos: Array<Todo>;
//     toggleTodo: ToggleTodo;
//     removeTodo: RemoveTodo;
// }

// export const TodoList: React.FC<TodolistProps> = ({ todos, toggleTodo, removeTodo }) => {
//     return (
//         <ul>
//             {todos.map(todo => {
//                 return <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
//             })}
//         </ul>
//     );
// };


import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import FolderIcon from '@material-ui/icons/Folder';
// import DeleteIcon from '@material-ui/icons/Delete';

import { TodoListItem } from './TodoListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            margin: theme.spacing(4, 0, 2),
        },
    }),
);

interface TodolistProps {
    todos: Array<Todo>;
    toggleTodo: ToggleTodo;
    removeTodo: RemoveTodo;
}

export const TodoList: React.FC<TodolistProps> = ({ todos, toggleTodo, removeTodo }) => {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Grid container justify="center" spacing={spacing}>
                        <Grid item>
                            <Typography variant="h1" className={classes.title}>
                                Todo list
                            </Typography>
                            <div className={classes.demo}>
                                <List dense={dense}>
                                    {todos.map(todo => {
                                        return <TodoListItem key={todo.id} todo={todo} toggleTodo={toggleTodo} removeTodo={removeTodo} />
                                    })}
                                </List>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}