import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface GetTodosUseCase{
  execute():Promise<TodoEntity[]>;
};

export class GetTodos implements GetTodosUseCase{
  constructor(
    private readonly repository:TodoRepository
  ){}

  execute(): Promise<TodoEntity[]> {
    return this.repository.getAll();
  };
}