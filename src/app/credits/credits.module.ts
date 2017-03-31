import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


import 'jasny-bootstrap/js/fileinput.js';
import { DataTableModule } from '../components/datatables/datatables.module';

import { ListCreditsComponent } from './list/list-credits.component';
import { UpdateCreditsComponent } from './update/update-credits.component';
import { InspectCreditsComponent } from './inspect/inspect-credits.component';
import { CreditsService } from './credits.service';
import { LayoutService } from '../layout/layout.service';
import { SearchPipe } from './list/pipes/search-pipe';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListCreditsComponent},
  {path: 'update/:id', component: UpdateCreditsComponent},
  {path: 'inspect/:id', component: InspectCreditsComponent}
];

@NgModule({
  declarations: [
    ListCreditsComponent,
    UpdateCreditsComponent,
    InspectCreditsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    CreditsService,
    LayoutService
  ]
})
export default class CreditsModule {
  static routes = routes;
}
