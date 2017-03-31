import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import GlobalConfig = require('../global.config');

@Injectable()
export class LoginService {
  private loggedIn = false;
  tokenClient: String;
  tokenServer: String;
  idClient:    String;

  constructor(private http: Http) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  login(Model) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http
      .post(
        GlobalConfig.server+'/login', 
        Model, 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.state=="1") {
          localStorage.setItem('auth_token', res.auth_token);
          localStorage.setItem('tokenS', res.auth_token);
          localStorage.setItem('user_name', Model.User );
          localStorage.setItem('check_point', res.id );
          localStorage.setItem('name', res.name+" "+res.lastname );
          localStorage.setItem('photo', res.photo );
          localStorage.setItem('m_timeout', res.sessiontime);
        }

        return res.state;
      });
  }
  
  logout() {

    var id;

    if(localStorage.getItem('check_point')){
      
      id = localStorage.getItem('check_point');
      
      this.ClearServer(id).subscribe((result) => {
        if(result==1){
          console.log("Sesión cerrada correctamente.");
        }
      });
    
    }
    localStorage.clear();
  }

  ClearServer(id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');

    return this.http.put(GlobalConfig.server+'/login', { id: id }, { headers })
    .map(res => res.json())
    .map((res) => {
      return res.state;
    });
  }

  check(id, tokenClient){

    this.checkHttp(id, tokenClient).subscribe((result) => {
      localStorage.setItem('tokenS', result);
    });

  }

  checkHttp(id, tokenClient){
    
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    
    return this.http
      .post(
        GlobalConfig.server+'/check', 
        { id: id, token: tokenClient }, 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        return res.token;
      });
  }

  isLoggedIn() {

    this.idClient    = localStorage.getItem('check_point');
    this.tokenClient = localStorage.getItem('auth_token'); 
    this.check(this.idClient, this.tokenClient);

    this.tokenServer = localStorage.getItem('tokenS'); 

    if(this.tokenClient && this.tokenServer && this.tokenClient == this.tokenServer){
      this.loggedIn = true;
      return true;
    }else{
      this.loggedIn = false;
      return false;
    }
  }
}