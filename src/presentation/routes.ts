import { Router } from "express";
import { TodoRoutes } from "./todos/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // sendingt the reference to the routes of the entity
    router.use("/api/todos", TodoRoutes.routes);

    return router;
  }
}
