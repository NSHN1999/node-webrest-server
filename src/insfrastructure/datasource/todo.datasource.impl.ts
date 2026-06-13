import { prisma } from "../../database/postgres/index.js";
import { TodoDataSource } from "../../domain/datasource/todo.datasource.js";
import type { CreateTodoDto } from "../../domain/dtos/index.js";
import type { UpdateTodoDto } from "../../domain/dtos/todos/update-todo-dto.js";
import { TodoEntity } from "../../domain/entities/todo.entity.js";

export class TodoDatasourceImpl implements TodoDataSource {
  constrcutor(){};

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(todo => TodoEntity.fromObject(todo));
  }

  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {
        id: id
      },
    });

    if(!todo) throw new Error(`Todo with id ${id} not found`);

    return TodoEntity.fromObject(todo);
  }

  async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id);

    const updateTodo = await prisma.todo.update({
      where: {id: updateTodoDto.id},
      data: updateTodoDto!.values
    });

    return TodoEntity.fromObject(updateTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.getById(id);

    const deleted = await prisma.todo.delete({
      where:{id: id}
    });

    return TodoEntity.fromObject(deleted);
  }
};