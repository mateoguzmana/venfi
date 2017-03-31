import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../components/datatables/datatables.module';

import { UpdateConfigComponent } from './update/update-config.component';
import { ConfigService } from './config.service';
import { LayoutService } from '../layout/layout.service';

export const routes = [
  {path: '', redirectTo: 'update', pathMatch: 'full'},
  {path: 'update', component: UpdateConfigComponent}
];

@NgModule({
  declarations: [
    UpdateConfigComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ConfigService,
    LayoutService
  ]
})
export default class UsersModule {
  static routes = routes;
}
