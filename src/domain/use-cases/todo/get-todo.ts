import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetTodoUseCase{
  execute(id:number):Promise<TodoEntity>;
};

export class GetTodo implements GetTodoUseCase{
  constructor(
    private readonly repository:TodoRepository
  ){}

  execute(id:number): Promise<TodoEntity> {
    return this.repository.getById(id);
  };
}