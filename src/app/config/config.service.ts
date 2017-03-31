import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class ConfigService {

  constructor(private http: Http) {}

  getConfig() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/config',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res; 
      });
  }

  updateConfig(Config) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/config',
        Config,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  uploadFile(file) {
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
          xhr.open("POST", GlobalConfig.server+'/config/uploadFile', true);
          xhr.send(formData);
      });
  }

  getAllTypeDocuments() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/TypeDocuments',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res; 
      });
  }

  insertTypeDocument(name, arraycheck, type, arraycheck2) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/TypeDocuments',
        { name: name, arraycheck: arraycheck, type: type, arraycheck2: arraycheck2 },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  updateTypeDocument(id, name, arraycheck, type, arraycheck2) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/TypeDocuments',
        { idtypedocument: id, name: name, arraycheck: arraycheck, type: type, arraycheck2: arraycheck2},
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
         GlobalConfig.server+'/TypeDocuments/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  getAllWorkflow() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/Workflow',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res; 
      });
  }

  getActiveWorkflow() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/Workflow/Active',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res; 
      });
  }

  insertWorkflow(name) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/Workflow',
        { name: name },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  updateWorkflow(id, name) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/Workflow',
        { idworkflow: id, name: name },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  changeStateWorkflow(id, state) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
         GlobalConfig.server+'/Workflow/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }
}