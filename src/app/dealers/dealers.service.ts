import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class DealersService {

  constructor(private http: Http) {}

  getAllDealers() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/dealers',
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getDealer(id) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .get(
         GlobalConfig.server+'/dealers/'+id,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  insertDealer(Dealer) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
         GlobalConfig.server+'/dealers',
        Dealer,
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }

  updateDealer(Dealer){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .put(
         GlobalConfig.server+'/dealers',
        Dealer,
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
         GlobalConfig.server+'/dealers/changeState',
        {id: id, state: state},
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.state;
      });
  }
}