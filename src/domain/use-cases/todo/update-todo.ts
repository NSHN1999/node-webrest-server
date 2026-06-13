import type { UpdateTodoDto } from "../../dtos/todos/update-todo-dto.js";
import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";

interface UpdateTodoUseCase{
  execute(dto:UpdateTodoDto):Promise<TodoEntity>;
};

export class UpdateTodo implements UpdateTodoUseCase{
  constructor(
    private readonly repository:TodoRepository
  ){}

  execute(dto: UpdateTodoDto): Promise<TodoEntity> {
    return this.repository.updateById(dto);
  };
}