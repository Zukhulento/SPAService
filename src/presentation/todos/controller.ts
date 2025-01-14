import { Request, Response } from "express";

// Temp data
const todos = [
  { id: 1, text: "buy milk", createdAt: new Date() },
  { id: 2, text: "buy bread", createdAt: null },
  { id: 3, text: "buy butter", createdAt: new Date() },
];

export class TodosController {
  //* Dependency injection
  constructor() {}

  //* "/"
  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };
}
