import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class RolesService {

  constructor(private http: Http) {}

  getAllRoles() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/roles',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getRole(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/roles/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }


  insertRole(Role, file: File) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            
            formData.append("uploads[]", file, file.name);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", GlobalConfig.server+'/roles?name='+Role.name, true);
            xhr.send(formData);
        });
    }

  updateRole(Role) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/roles',
        Role,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  uploadPhoto(id, file: File) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            
            formData.append("uploads[]", file, file.name);
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", GlobalConfig.server+'/roles/uploadPhoto?id='+id, true);
            xhr.send(formData);
        });
    }

  changeState(id, state) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/roles/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  getMenu(val) {

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
}