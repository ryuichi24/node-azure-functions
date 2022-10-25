import { CreateTodoDto } from "../dtos/CreateTodoDto";
import { UpdateTodoDto } from "../dtos/UpdateTodoDto";
import { TodoItem } from "../models/TodoItem";
import { todoRepository } from "../repositories/todo-repository";
import { generateId } from "../utils/generate-id";

export const getTodos = async (): Promise<TodoItem[] | any> => {
  return await todoRepository.getOnes();
};

export const getTodo = async (id: string): Promise<any> => {
  return await todoRepository.getOneById(id);
};

export const createTodo = async (dto: CreateTodoDto): Promise<TodoItem> => {
  const newTodo: TodoItem = {
    id: generateId(),
    ...dto,
    isCompleted: false,
  };

  return await todoRepository.createOne(newTodo);
};

export const deleteTodo = async (id: string) => {
  const existingTodo = await todoRepository.getOneById(id);
  if (!existingTodo) {
    return false;
  }

  todoRepository.removeOneById(existingTodo.id);
};

export const updateTodo = async (dto: UpdateTodoDto, id: string) => {
  const existingTodo = await todoRepository.getOneById(id);
  if (!existingTodo) {
    return false;
  }

  if (typeof dto.title !== "undefined") {
    existingTodo.title = dto.title;
  }

  if (typeof dto.isCompleted !== "undefined") {
    existingTodo.isCompleted = dto.isCompleted;
  }

  await todoRepository.update(existingTodo);
};
