import { Router } from "express";
import { TodoController } from "./controller.js";
import { TodoDatasourceImpl } from "../../insfrastructure/datasource/todo.datasource.impl.js";
import { TodoRepositoryImpl } from "../../insfrastructure/repository/todo.repository.impl.js";

export class TodoRouter {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);

    const todoController = new TodoController(todoRepository);

    router.get("/", todoController.getTodos);
    router.get("/:id", todoController.getTodoById);
    router.post("/", todoController.createTodo);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router;
  };
};