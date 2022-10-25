import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { deleteTodo } from "../services/todo-service";

const deleteHttpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  const todoId = context.bindingData.id;

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
 
 await deleteTodo(todoId);

  context.res = {
    status: 204,
  };
};

export default deleteHttpTrigger;
