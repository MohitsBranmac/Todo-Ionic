import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoProvider {

  private todos = []
  private archivedTodos = []

  constructor() {
    console.log('Hello TodoProvider Provider');
  }

  archiveTodo (todoIndex) {
    let todoToBeArchived = this.todos[todoIndex]
    this.todos.splice (todoIndex, 1)
    this.archivedTodos.push (todoToBeArchived)
  }

  getTodos () {
    return this.todos;
  }

  getArchivedTodos () {
    return this.archivedTodos
  }

  addTodo (todo) {
    return this.todos.push (todo);
  }
}
