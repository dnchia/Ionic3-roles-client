import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthProvider} from "../auth/auth";


@Injectable()
export class TodosProvider {

  constructor(public http: Http, public authService: AuthProvider) {

  }


  public getTodos() {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.get('https://server_dir/api/todos', {headers: headers})
        .map((res) => res.json())
        .subscribe((data) => {
          resolve(data);
        },
        (err) => {
          reject(err);
        });
    });
  }

  public createTodo(todo) {
    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);

      this.http.post('https://server_dir/api/todos', JSON.stringify(todo), {headers: headers})
        .map((res) => res.json())
        .subscribe((res) => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public deleteTodo(id: any) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Authorization', this.authService.token);

      this.http.delete('https://server_dir/api/todos/' + id, {headers: headers})
        .subscribe(
          (res) => {
        resolve(res);
      },
        (err) => {
          reject(err);
        });
    });

  }
}
