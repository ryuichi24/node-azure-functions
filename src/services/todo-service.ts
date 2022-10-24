interface TodoItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface CreateTodoDto {
  title: string;
}

interface UpdateTodoDto {
  title: string;
  isCompleted: boolean;
}

const generateId = () => Math.floor(Math.random() * 1000) + 1;

let todos: TodoItem[] = [
  {
    id: generateId(),
    title: "todo 1",
    isCompleted: false,
  },
  {
    id: generateId(),
    title: "todo 1",
    isCompleted: false,
  },
  {
    id: generateId(),
    title: "todo 1",
    isCompleted: false,
  },
];

export const getTodos = async (): Promise<TodoItem[]> => {
  return todos;
};

export const getTodo = async (id: number): Promise<TodoItem> => {
  return todos.find((todoItem) => todoItem.id === id);
};

export const createTodo = async (dto: CreateTodoDto): Promise<TodoItem> => {
  const newTodo: TodoItem = {
    id: generateId(),
    ...dto,
    isCompleted: false,
  };

  todos.push(newTodo);

  return newTodo;
};

export const deleteTodo = async (todoId: number) => {
  const existingTodo = todos.find((todoItem) => todoItem.id === todoId);
  if (!existingTodo) {
    return false;
  }

  todos = [...todos.filter((todoItem) => todoItem.id !== existingTodo.id)];
};

export const updateTodo = async (dto: UpdateTodoDto, todoId: number) => {
  const existingTodo = todos.find((todoItem) => todoItem.id === todoId);
  if (!existingTodo) {
    return false;
  }

  if (typeof dto.title !== "undefined") {
    existingTodo.title = dto.title;
  }

  if (typeof dto.isCompleted !== "undefined") {
    existingTodo.isCompleted = dto.isCompleted;
  }

  todos = [
    ...todos.filter((todoItem) => todoItem.id !== existingTodo.id),
    existingTodo,
  ];
};
