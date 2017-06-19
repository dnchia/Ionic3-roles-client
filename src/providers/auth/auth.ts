import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from "@ionic/storage";


@Injectable()
export class AuthProvider {

  public token : any;


  constructor(public http: Http, public storage: Storage) {

  }


  public checkAuthentication() {
    return new Promise((resolve, reject) => {

      // Load token if exists
      this.storage.get('token').then((value) => {
        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get('https://server_dir/api/auth/protected', {headers: headers})
          .subscribe((res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          });
      });
    })
  }

  public createAccount(details: any) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://server_dir/api/auth/register', JSON.stringify(details), {headers: headers})
        .subscribe((res) => {

          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);
        },
        (err) => {
          reject(err);
        });
    });
  }

  public login(credentials: any) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post('https://server_dir/api/auth/login', JSON.stringify(credentials), {headers: headers})
        .subscribe((res) => {

          let data = res.json();
          this.token = data.token;
          this.storage.set('token', data.token);
          resolve(data);

          resolve(res.json());
        },
          (err) => {
            reject(err);
          }
        );
    });

  }

  public logout() {
    this.storage.set('token', '');
  }
}
