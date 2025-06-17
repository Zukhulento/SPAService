import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import {
  CreateTodo,
  DeleteTodo,
  GetTodo,
  GetTodos,
  TodoRepository,
  UpdateTodo,
} from "../../domain";

export class TodosController {
  //* Dependency injection
  constructor(private readonly todoRepository: TodoRepository) {}

  //* "/"
  public getTodos = (req: Request, res: Response) => {
    // Consuming the use case
    new GetTodos(this.todoRepository)
      .execute()
      .then((todos) => res.json(todos))
      .catch((error) => res.status(400).json({ error }));
  };
  //* "/:id"
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    new GetTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
  //* "/"
  public createTodo = (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error || !createTodoDto) {
      res.status(400).json({ error });
      return;
    }
    new CreateTodo(this.todoRepository)
      .execute(createTodoDto)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };

  //? Considerations to update a todo:
  //* 1. The property that is provided in the body is the one that is updated
  //* 2. If the property is not provided, the property of the todo is not updated
  //* 3. If the property comes null, the property of the todo is eliminated (This is a standard behavior of the API)
  //* "/:id"
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) {
      res.status(400).json({ error });
      return;
    }
    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
  //* "/:id"
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then((todo) => res.json(todo))
      .catch((error) => res.status(400).json({ error }));
  };
}
