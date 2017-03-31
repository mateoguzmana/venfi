import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import GlobalConfig = require('../global.config');

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class Login {
  routeFile = GlobalConfig.server+"/uploads/config/logo.png";
  User:     String;
  Password: String;
  model:    Object = {
    User: this.User,
    Password: this.Password
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.model).subscribe((result) => {
      if (result==1) {
        this.router.navigate(['/app/dashboard']);
      }else{
        $("#MessageError").fadeIn().delay(2000).fadeOut();
      }
    });
  }

}
