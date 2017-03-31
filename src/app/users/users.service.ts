import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class UsersService {

  constructor(private http: Http) {}

  getAllUsers() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/users',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getUser(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/users/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  insertUser(User) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/users',
        User,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  updateUser(User) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/users',
        User,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  changeState(id, state) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/users/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  getActiveRoles() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/roles/Active',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
}