import type { Request, Response } from "express";
import { prisma } from "../../database/postgres/index.js";
import { CreateTodoDto } from "../../domain/dtos/index.js";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodoController {
  constructor(
    private readonly todoRepository:TodoRepository
  ){};

  public getTodos = async(req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos);
  };

  public getTodoById = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    try{
      const todo = await this.todoRepository.getById(id);

      res.json(todo);
    }catch(error){
      res.status(400).json({error:error});
    }
  };

  public createTodo = async (req:Request, res:Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if(error) return res.status(400).json({error: error });
    
    const todo = await this.todoRepository.create(createTodoDto!);

    res.status(201).json(todo);
  };

  public updateTodo = async(req: Request, res: Response) => {
    const id = +req.params.id!;
    const [error, updateTodoDto] = UpdateTodoDto.create({...req.body, id});
    if(error) return res.status(400).json({error});

    const todoUpdate = await this.todoRepository.updateById(updateTodoDto!);

    res.json(todoUpdate);
  };

  public deleteTodo = async(req:Request, res:Response) => {
    const id = +req.params.id!;
    if(isNaN(id)) return res.status(400).json({error: "Id property is required"});

    const deleted = await this.todoRepository.deleteById(id);

    res.json(deleted);
  };
};