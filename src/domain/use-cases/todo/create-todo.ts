import type { CreateTodoDto } from "../../dtos/index.js";
import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface CreateTodoUseCase{
  execute(dto:CreateTodoDto):Promise<TodoEntity>;
};

export class CreateTodo implements CreateTodoUseCase{
  constructor(
    private readonly repository:TodoRepository
  ){}

  execute(dto: CreateTodoDto): Promise<TodoEntity> {
    return this.repository.create(dto);
  };
}