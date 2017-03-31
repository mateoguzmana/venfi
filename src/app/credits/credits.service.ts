import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class CreditsService {

  constructor(private http: Http) {}

  getAllCredits() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/credits',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
  
  getAllCreditsForInspect() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/credits/ForInspect',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getCredit(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/credits/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getTypeDocuments(workflow) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/TypeDocuments/Active/'+workflow,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getTypeDocumentsForResponse(workflow) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/TypeDocuments/ActiveForResponse/'+workflow,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getDocumentsForResponse(id, workflow) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/credits/getDocumentsForResponse/'+id+'/'+workflow,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getWorkflow() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/workflow/Active/',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  StepOne(Credit) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/credits',
        Credit,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  StepTwo(Credit) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/credits/StepTwo',
        Credit,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  updateCredit(Credit){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
         GlobalConfig.server+'/credits',
        Credit,
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
         GlobalConfig.server+'/credits/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

    uploadDocument(credit, id, type, file: File) {
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
            xhr.open("POST", GlobalConfig.server+'/credits/uploadDocument?credit='+credit+'&type='+type+'&id='+id, true);
            xhr.send(formData);
        });
    }

    uploadDocumentForResponse(credit, type, workflow, file: File) {
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
            xhr.open("POST", GlobalConfig.server+'/credits/uploadDocumentForResponse?credit='+credit+'&type='+type+'&workflow='+workflow, true);
            xhr.send(formData);
        });
    }

    DeleteDocument(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
         GlobalConfig.server+'/credits/DeleteDocument',
        { id: id },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  DeleteDocumentForResponse(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
         GlobalConfig.server+'/credits/DeleteDocumentForResponse',
        { id: id },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  SendCredit(idcredit) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/credits/SendCredit',
        { idcredit: idcredit },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  validateCredit(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/credits/validateCredit/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  approveCredit(idcredit, note, workflow) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/credits/approveCredit',
        { idcredit: idcredit, note: note, workflow: workflow },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  rejectCredit(idcredit, note) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/credits/rejectCredit',
        { idcredit: idcredit, note: note },
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }
}