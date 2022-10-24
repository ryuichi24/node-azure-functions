import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { createTodo } from "../services/todo-service";

const postTodosHttpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoCreateDto = req.body;
  const result = await createTodo(todoCreateDto);

  context.res = {
    status: 201,
    body: result,
  };
};

export default postTodosHttpTrigger;
