import { Request, Response } from "express";

// Temp data
const todos = [
  { id: 1, text: "buy milk", completedAt: new Date() },
  { id: 2, text: "buy bread", completedAt: null },
  { id: 3, text: "buy butter", completedAt: new Date() },
];

export class TodosController {
  //* Dependency injection
  constructor() {}

  //* "/"
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };
  //* "/:id"
  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    const todo = todos.find((todo) => todo.id === id);
    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo with id ${id} not found` });
  };
  //* "/"
  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;
    if (!text) {
      res.status(400).json({ error: "Text property is required" });
      return;
    }
    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: null,
    };
    todos.push(newTodo);
    res.json(newTodo);
  };

  //? Considerations:
  //* 1. The property that is provided in the body is the one that is updated
  //* 2. If the property is not provided, the property of the todo is not updated
  //* 3. If the property comes null, the property of the todo is eliminated (This is a standard behavior of the API)
  //* "/:id"
  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    const { text, completedAt } = req.body;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      res.status(400).json({ error: `Todo with ID ${id} not found.` });
      return;
    }
    //! Ojo, esto lo que hace es actualizar la referencia
    todo.text = text || todo.text;
    completedAt === "null"
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt));
    res.json(todo);
  };
  //* "/:id"
  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;
    if (isNaN(id)) {
      res.status(400).json({ error: "ID argument is not a number" });
      return;
    }
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!todoToDelete) {
      res.status(404).json({ error: `Todo with ID ${id} not found.` });
      return;
    }
    todos.splice(todos.indexOf(todoToDelete), 1);
    res.json({ message: "Todo deleted successfully", todo: todoToDelete });
    return;
  };
}
