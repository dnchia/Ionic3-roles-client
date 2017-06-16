import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  public role : string;
  public email : string;
  public password : string;

  public loading : any;


  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

  }


  public register() {
    this.showLoader();

    let details = {
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.createAccount(details).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    },
      (err) => {
      this.loading.dismiss();
      });
  }

  public showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }

}
