import { Component } from '@angular/core';
import {IonicPage, NavController, LoadingController} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email : string;
  public password : string;
  public loading : any;


  constructor(public navCtrl: NavController, public authService: AuthProvider, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    this.showLoader();

    // Check if authenticated
    this.authService.checkAuthentication().then((res) => {
      console.log("Already authorized");
      this.loading.dismiss();
      this.navCtrl.setRoot(HomePage);
    },
      (err) => {
        console.log("Not already authorized");
        this.loading.dismiss();
      });
  }


  public login() {
    this.showLoader();

    let credentials = {
      email: this.email,
      password: this.password
    };

    this.authService.login(credentials).then((result) => {
      this.loading.dismiss();
      console.log(result);
      this.navCtrl.setRoot(HomePage);
    },
      (err) => {
        this.loading.dismiss();
        console.log(err);
      })
  }

  public launchSignup() {
    this.navCtrl.push('SignupPage');
  }

  public showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });

    this.loading.present();
  }
}
