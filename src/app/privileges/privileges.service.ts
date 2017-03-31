import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class PrivilegesService {

  constructor(private http: Http) {}

  getPrivileges(val) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/privileges?rol='+val,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  updatePrivileges(data) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/privileges',
        data,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
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