import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoProvider {

  private todos = []

  constructor(public http: HttpClient) {
    console.log('Hello TodoProvider Provider');
  }

  getTodos () {
    return this.todos;
  }

  addTodo (todo) {
    return this.todos.push (todo);
  }
}
