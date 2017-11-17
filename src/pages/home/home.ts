import { ArchivedTodosPage } from './../archived-todos/archived-todos';
import { TodoProvider } from './../../providers/todo/todo';
import { Component } from '@angular/core';
import { NavController, reorderArray, ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = []
  public reorderIsEnabled = false
  public archivedTodosPage = ArchivedTodosPage

  constructor (
    private todoProvider: TodoProvider,
    public navCtrl: NavController, 
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { 
      this.todos = this.todoProvider.getTodos ();
  }

  toggleReorder () {
    this.reorderIsEnabled = !this.reorderIsEnabled;
  }

  itemReordered ($event) {
    reorderArray (this.todos, $event)
  }

  goToArchivePage () {
    this.navCtrl.push (ArchivedTodosPage)
  }

  archiveTodo (todoIndex) {
    this.todoProvider.archiveTodo (todoIndex)
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

            addTodoAlert.onDidDismiss (() => {
              let addTodoToast = this.toastCtrl.create ({
                message: "Todo added succesfully!",
                position: "bottom",
                duration: 2000,
                showCloseButton: true
              });
              addTodoToast.present ()
            });
          }
        }
      ]
    })
    addTodoAlert.present()
  }
  
  editTodo (todoIndex) {
    let editTodoAlert = this.alertCtrl.create ({
      title: "Edit Todo",
      message: "Edit this todo with a new todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value: this.todos[todoIndex]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Edit",
          handler: (inputData) => {
            let todoText;
            todoText = inputData.editTodoInput;
            this.todoProvider.editTodo (todoText, todoIndex);

            editTodoAlert.onDidDismiss (() => {
              let editTodoToast = this.toastCtrl.create ({
                message: "Updated successfully!",
                duration: 2000,
                position: "bottom",
                showCloseButton: true
              })
              editTodoToast.present ()
            })
          }
        }
      ]
    })
    editTodoAlert.present ()
  }
}
