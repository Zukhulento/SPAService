import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

// Temp data
// const todos = [
//   { id: 1, text: "buy milk", completedAt: new Date() },
//   { id: 2, text: "buy bread", completedAt: null },
//   { id: 3, text: "buy butter", completedAt: new Date() },
// ];

export class TodosController {
  //* Dependency injection
  constructor() {}

  //* "/"
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  };
  //* "/:id"
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    const todo = await prisma.todo.findFirst({
      where: {
        id: id,
      },
    });
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
  //* "/"
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error || !createTodoDto) {
      res.status(400).json({ error });
      return;
    }
    const newTodo = await prisma.todo.create({
      data: createTodoDto,
    });
    res.json(newTodo);
  };

  //? Considerations:
  //* 1. The property that is provided in the body is the one that is updated
  //* 2. If the property is not provided, the property of the todo is not updated
  //* 3. If the property comes null, the property of the todo is eliminated (This is a standard behavior of the API)
  //* "/:id"
  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updateTodoDto] = UpdateTodoDto.create({ ...req.body, id });
    if (error) {
      res.status(400).json({ error });
      return;
    }
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
    });
    if (!todo) {
      res.status(400).json({ error: `Todo with ID ${id} not found.` });
      return;
    }
    const updatedTodo = await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDto!.value,
    });
    res.json(updatedTodo);
  };
  //* "/:id"
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    if (!todo) {
      res.status(400).json({ error: `Todo with ID ${id} not found.` });
      return;
    }
    const todoDeleted = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    res.json(todo);
    return;
  };
}
