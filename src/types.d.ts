type Todo = {
    id: number;
    name: string;
    task: number;
};

type ToggleTodo = (selectedTodo: Todo) => void; 

type AddTodo = (todoText: string) => void;

type RemoveTodo = (id: number) => void;