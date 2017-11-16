import { TodoProvider } from './../../providers/todo/todo';
import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = []
  public reorderIsEnabled = false;

  constructor (
    private todoProvider: TodoProvider,
    public navCtrl: NavController, 
    private alertCtrl: AlertController
  ) { 
      this.todos = this.todoProvider.getTodos ();
  }

  toggleReorder () {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered ($event) {
    reorderArray (this.todos, $event)
  }

  openTodoAlert () {
    let addTodoAlert = this.alertCtrl.create ({
      title: "Add a Todo",
      message: "Enter your todo",
      inputs: [
        {
          type: "text",
          name: "addTodoInput"
        }
      ],
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: "Add Todo",
          handler: inputData => {
            let todoText;
            todoText = inputData.addTodoInput;
            this.todoProvider.addTodo (todoText);
          }
        }
      ]
    })
    addTodoAlert.present()
  }
  
}
