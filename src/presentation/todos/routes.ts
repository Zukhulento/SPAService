import { Router } from "express";
import { TodosController } from "./controller";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();
    // Obtaining the todo controller
    const todoController = new TodosController();

    // sendingt the reference to the function
    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodos);

    return router;
  }
}
