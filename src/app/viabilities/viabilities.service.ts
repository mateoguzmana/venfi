import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class ViabilitiesService {

  constructor(private http: Http) {}

  getAllViabilities() {

    let check_point = localStorage.getItem("check_point");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/viabilities/All/'+check_point,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getAllViabilities2() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/viabilities/Second',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getViability(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/viabilities/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getDealers() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/dealers/Active',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  insertViability(Viability) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/viabilities',
        Viability,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  updateViability(Viability) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/viabilities',
        Viability,
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
        GlobalConfig.server+'/viabilities/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

   ApproveViability(id, nit, name, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, note, finalvalue, safevalue) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/credits/approve',
        {id: id, nit: nit, name: name, occupation: occupation, income: income, nitcodebtor: nitcodebtor, namecodebtor: namecodebtor, incomecodebtor: incomecodebtor, note: note, finalvalue: finalvalue, safevalue: safevalue},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  RejectViability(id, nit, note) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/credits/reject',
        {id: id, nit: nit, note: note},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  cloneViability(Viability) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/viabilities/clone',
        Viability,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  printViability(id){
    window.open(GlobalConfig.server+'/viabilities/print/'+id+'.pdf','_blank');
  }

      
  uploadFile(id, params: Array<string>,files: Array<File>) {
        return new Promise((resolve, reject) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
                
            for(var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open("POST", GlobalConfig.server+'/viabilities/uploadFile?id='+id, true);
            xhr.send(formData);
        });
    }

    uploadFile2(id, file: File) {
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
            xhr.open("POST", GlobalConfig.server+'/viabilities/uploadFile2?id='+id, true);
            xhr.send(formData);
        });
    }
}