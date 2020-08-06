type Todo = {
    id: number;
    text: string;
    complete: boolean;
}

type ToggleTodo = (selectedTodo: Todo) => void; 

type AddTodo = (newTodo: string) => void;

type RemoveTodo = (id: number) => void;