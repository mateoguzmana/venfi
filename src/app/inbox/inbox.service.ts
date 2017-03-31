import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class InboxService {

  constructor(private http: Http) {}

  getAllMessages() {

    var check_point = localStorage.getItem("check_point");

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/messages/All/'+check_point,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getAllEmails() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
        GlobalConfig.server+'/users/getAllEmails',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getUsersEmail(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/messages/getUsersEmail',
        {id: id},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  sendMail(content) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/messages/',
        content,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  draftMail(content) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/messages/Draft',
        content,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  deleteMessages(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
        GlobalConfig.server+'/messages/deleteMessages',
        {id: id},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }
 
}