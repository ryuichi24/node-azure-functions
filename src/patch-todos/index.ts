import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { updateTodo } from "../services/todo-service";

const patchHttpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoId = context.bindingData.id;
  const updateTodoDto = req.body;

  if (!todoId) {
    context.res = {
      status: 400,
      body: {
        error: {
          message: "id is not provided",
        },
      },
    };
    return;
  }

  await updateTodo(updateTodoDto, todoId)

  context.res = {
    status: 204,
  };
};

export default patchHttpTrigger;
