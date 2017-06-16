import { Component } from '@angular/core';
import {NavController, LoadingController, AlertController, ModalController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {TodosProvider} from "../../providers/todos/todos";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos : any;
  public loading : any;


  constructor(public navCtrl: NavController,
              public todoService: TodosProvider,
              public modalCtrl: ModalController,
              public alertCtrl: AlertController,
              public authService: AuthProvider,
              public loadingCtrl: LoadingController
  ) {

  }

  ionViewDidLoad() {

    this.todoService.getTodos().then((data) => {
      this.todos = data;
    }, (err) => {
      console.log("not allowed");
    });

  }


  public addTodo(){

    let prompt = this.alertCtrl.create({
      title: 'Add Todo',
      message: 'Describe your todo below:',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: todo => {

            if(todo){

              this.showLoader();

              this.todoService.createTodo(todo).then((result) => {
                this.loading.dismiss();
                this.todos = result;
                console.log("todo created");
              }, (err) => {
                this.loading.dismiss();
                console.log("not allowed");
              });

            }


          }
        }
      ]
    });

    prompt.present();

  }

  public deleteTodo(todo) {

    this.showLoader();

    //Remove from database
    this.todoService.deleteTodo(todo._id).then((result) => {

      this.loading.dismiss();

      //Remove locally
      let index = this.todos.indexOf(todo);

      if(index > -1){
        this.todos.splice(index, 1);
      }

    }, (err) => {
      this.loading.dismiss();
      console.log("not allowed");
    });
  }

  public showLoader() {

    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();

  }

  public logout() {
    this.authService.logout();
    this.navCtrl.setRoot('LoginPage');
  }
}
