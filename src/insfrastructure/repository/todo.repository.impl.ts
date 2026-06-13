import type { TodoDataSource } from "../../domain/datasource/todo.datasource.js";
import type { CreateTodoDto } from "../../domain/dtos/index.js";
import type { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto.js";
import type { TodoEntity } from "../../domain/entities/todo.entity.js";
import type { TodoRepository } from "../../domain/repositories/todo.repository.js";

export class TodoRepositoryImpl implements TodoRepository{
  constructor(
    private readonly datasource:TodoDataSource
  ){}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }

  getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id);
  }

  updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.updateById(updateTodoDto);
  }
  
  deleteById(id: number): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
  
};