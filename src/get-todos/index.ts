import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { getTodo, getTodos } from "../services/todo-service";

const getTodosHttpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoId = context.bindingData.id;

  if (todoId) {
    const result = await getTodo(todoId);
    context.res = {
      status: 200,
      body: result,
    };

    return;
  }

  const result = await getTodos();

  context.res = {
    status: 200,
    body: result,
  };
};

export default getTodosHttpTrigger;
