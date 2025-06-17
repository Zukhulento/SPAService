import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

// This is a Domain Driven Design (DDD) approach controller
export class TodosController {
  //* Dependency injection
  constructor(private readonly todoRepository: TodoRepository) {}

  //* "/"
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    res.json(todos);
  };
  //* "/:id"
  public getTodoById = async (req: Request, res: Response) => {
    const id = +req.params.id;
    try {
      const todo = await this.todoRepository.findById(id);
      res.json(todo);
    } catch (error) {
      res.status(404).json({ error });
    }
  };
  //* "/"
  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error || !createTodoDto) {
      res.status(400).json({ error });
      return;
    }
    const newTodo = await this.todoRepository.create(createTodoDto);
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
    const updatedTodo = await this.todoRepository.updateById(updateTodoDto!)
    res.json(updatedTodo);
  };
  //* "/:id"
  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    try {
      const todoDeleted = await this.todoRepository.deleteById(id);
      res.json(todoDeleted);
    } catch (error) {
      res.status(404).json({ error });
    }
  };
}
