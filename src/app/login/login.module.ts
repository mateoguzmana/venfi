import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Login } from './login.component';
import { LoginService } from './login.service';
import { LoggedInGuard } from './logged-in.guard';

export const routes = [
  { path: '', component: Login, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    Login
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    LoginService,
    LoggedInGuard
  ]
})
export default class LoginModule {
  static routes = routes;
}
