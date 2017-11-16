import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos = []

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

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
            this.todos.push (todoText);
          }
        }
      ]
    })
    addTodoAlert.present()
  }
  
}
