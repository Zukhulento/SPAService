import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDataSourceImpl } from "../../infraestructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infraestructure/repositories/todo.respostory.impl";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    //* Obtaining the datasource
    const datasource = new TodoDataSourceImpl()
    //* Obtaining the repository
    const todoRepository = new TodoRepositoryImpl(datasource);
    //* Obtaining the controller
    const todoController = new TodosController(todoRepository);

    // sendingt the reference to the function
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put("/:id", todoController.updateTodo);
    router.delete("/:id", todoController.deleteTodo);

    return router;
  }
}
