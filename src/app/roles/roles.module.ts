import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


declare var global: any;
// libs
var markdown = require('markdown').markdown;
global.markdown = markdown;
import 'bootstrap-markdown/js/bootstrap-markdown.js';
import 'bootstrap-select/dist/js/bootstrap-select.js';
import 'parsleyjs';
import 'bootstrap-application-wizard/src/bootstrap-wizard.js';
import 'twitter-bootstrap-wizard/jquery.bootstrap.wizard.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'jasny-bootstrap/js/inputmask.js';
import 'ng2-datetime/src/vendor/bootstrap-datepicker/bootstrap-datepicker.min.js';
import 'ng2-datetime/src/vendor/bootstrap-timepicker/bootstrap-timepicker.min.js';
import 'bootstrap-colorpicker';
import 'bootstrap-slider/dist/bootstrap-slider.js';
import 'dropzone/dist/dropzone.js';
import 'jasny-bootstrap/docs/assets/js/vendor/holder.js';
import 'jasny-bootstrap/js/fileinput.js';
import 'jasny-bootstrap/js/inputmask.js';

import { TooltipModule, AlertModule, DropdownModule } from 'ng2-bootstrap/ng2-bootstrap';
import { Autosize } from 'angular2-autosize';
import { Select2Module } from 'ng2-select2';
import { WidgetModule } from '../layout/widget/widget.module';
/* tslint:disable */
import { BootstrapWizardModule } from '../components/wizard/wizard.module';
import { DropzoneDemo } from '../components/dropzone/dropzone.directive';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { ListRolesComponent } from './list/list-roles.component';
import { InsertRolesComponent } from './insert/insert-roles.component';
import { UpdateRolesComponent } from './update/update-roles.component';
import { RolesService } from './roles.service';
import { LayoutService } from '../layout/layout.service';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListRolesComponent},
  {path: 'insert', component: InsertRolesComponent},
  {path: 'update/:id', component: UpdateRolesComponent}
];

@NgModule({
  declarations: [
    Autosize,
    DropzoneDemo,
    ListRolesComponent,
    InsertRolesComponent,
    UpdateRolesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    AlertModule,
    DropdownModule,
    WidgetModule,
    BootstrapWizardModule,
    NKDatetimeModule,
    Select2Module,
    RouterModule.forChild(routes),
  ],
  providers: [
    RolesService,
    LayoutService
  ]
})
export default class RolesModule {
  static routes = routes;
}
