import React, { useState, ChangeEvent, FormEvent } from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

interface AddTodoFormProps {
    addTodo: AddTodo;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }),
);

export const AddTodoform: React.FC<AddTodoFormProps> = ({ addTodo }) => {
    const classes = useStyles();
    const [newTodo, setNewTodo] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTodo(e.target.value);
    }

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        addTodo(newTodo);
        setNewTodo("");
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
                <Grid container justify="center" >
                    <Grid item>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField id="outlined-basic" size="small" label="Outlined" variant="outlined" value={newTodo} onChange={handleChange}/>
                            <Button variant="contained" color="primary" size="large" type="submit" onClick={handleSubmit}>Add Todo</Button>
                        </form>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}