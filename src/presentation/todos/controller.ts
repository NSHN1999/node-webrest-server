import type { Request, Response } from "express";

const todos = [
  { id: 1, text: 'Buy Milk', completedAt: new Date() },
  { id: 2, text: 'Buy Bread', completedAt: null },
  { id: 3, text: 'Buy Toys', completedAt: new Date() }
];

export class TodoController {
  constructor() { };

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id!;
    if (isNaN(id)) return res.status(400).json({ error: "Id is not a a number" });

    const todo = todos.find(todo => todo.id === id);
    (todo)
      ? res.json(todo)
      : res.status(404).json({
        ok: false,
        error: `Todo with id ${id} not found`
      })
  };

  public createTodo = (req:Request, res:Response) => {
    const { text } = req.body;
    if(!text) res.status(400).json({error: "Text property is required" });
    const newTodo = {
      id: todos.length + 1,
      text: text,
      completedAt: new Date()
    };

    todos.push(newTodo);

    res.status(201).json(newTodo);
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({error: "Id is not a number"});

    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return res.status(404).json({error: `Todo not found with id ${id}`});

    const {text, completedAt} = req.body.text;
    //if(!text) return res.status(400).json({error: "Text property is required"});

    todo.text = text || todo.text;
    (completedAt === 'null')
      ? todo.completedAt = null
      : todo.completedAt = new Date(completedAt || todo.completedAt)

    res.json(todo);
  };

  public deleteTodo = (req:Request, res:Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({error: "Id property is required"});

    const todo = todos.find((todo) => todo.id === id);
    if(!todo) return res.status(404).json({error: `Not found todo with id ${id}`});

    todos.splice(todos.indexOf(todo), 1);

    res.json(todo);
  };
};