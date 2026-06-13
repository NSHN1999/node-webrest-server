import type { CreateTodoDto } from "../../dtos/index.js";
import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface DeleteTodoUseCase{
  execute(id:number):Promise<TodoEntity>;
};

export class DeleteTodo implements DeleteTodoUseCase{
  constructor(
    private readonly repository:TodoRepository
  ){}

  execute(id:number): Promise<TodoEntity> {
    return this.repository.deleteById(id);
  };
}