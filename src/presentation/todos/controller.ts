import type { Request, Response } from "express";
import { prisma } from "../../database/postgres/index.js";
import { CreateTodoDto } from "../../domain/dtos/index.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto.js";

export class TodoController {
  constructor() { };

  public getTodos = async(req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos);
  };

  public getTodoById = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    if (isNaN(id)) return res.status(400).json({ error: "Id is not a a number" });

    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      },
    });

    (todo)
      ? res.json(todo)
      : res.status(404).json({
        ok: false,
        error: `Todo with id ${id} not found`
      })
  };

  public createTodo = async (req:Request, res:Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({error: error });
    
    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    res.status(201).json(todo);
  };

  public updateTodo = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});

    if(error) return res.status(400).json({error});

    const todo = await prisma.todo.findFirst({
      where:{
        id: id
      }
    });

    if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});

    const todoUpdate = await prisma.todo.update({
      where: {
        id: id
      },
      data: updateTodoDto!.values
    });

    res.json(todoUpdate);
  };

  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({error: "Id property is required"});

    const todo = await prisma.todo.findFirst({
      where:{
        id: id
      }
    });

    if(!todo) return res.status(404).json({error:`Todo with id ${id} not found`});

    const deleted = await prisma.todo.delete({
      where:{
        id: id
      }
    });

    (deleted)
      ? res.json(deleted)
      : res.status(400).json({error: `Todo with id ${id} not found`})
  };
};