import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class LayoutService {

  constructor(private http: Http) {}

  GetMenu() {

    let id = localStorage.getItem("check_point");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(GlobalConfig.server+'/menu', { id: id }, { headers } )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  PrivilegesForComponent(StaticPath) {

    let check_point = localStorage.getItem('check_point');

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(GlobalConfig.server+'/privileges/forComponent', { check_point: check_point, path: StaticPath }, { headers } )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  
  }

  getNotifications() {

    let id = localStorage.getItem("check_point");


      
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin', '*');

      return this.http
        .get(GlobalConfig.server+'/notifications/Active/'+id, { headers } )
        .map(res => res.json())
        .map((res) => {
          return res;
        });

  }

}