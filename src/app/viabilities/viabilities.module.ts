import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../components/datatables/datatables.module';

import { ListViabilitiesComponent } from './list/list-viabilities.component';
import { InsertViabilitiesComponent } from './insert/insert-viabilities.component';
import { UpdateViabilitiesComponent } from './update/update-viabilities.component';
import { InspectViabilitiesComponent } from './inspect/inspect-viabilities.component';
import { SeeViabilitiesComponent } from './see/see-viabilities.component';
import { ViabilitiesService } from './viabilities.service';
import { LayoutService } from '../layout/layout.service';
import { SearchPipe } from './list/pipes/search-pipe';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListViabilitiesComponent},
  {path: 'insert', component: InsertViabilitiesComponent},
  {path: 'update/:id', component: UpdateViabilitiesComponent},
  {path: 'inspect/:id', component: InspectViabilitiesComponent},
  {path: 'see/:id', component: SeeViabilitiesComponent}
];

@NgModule({
  declarations: [
    ListViabilitiesComponent,
    InsertViabilitiesComponent,
    UpdateViabilitiesComponent,
    InspectViabilitiesComponent,
    SeeViabilitiesComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ViabilitiesService,
    LayoutService
  ]
})
export default class ViabilitiesModule {
  static routes = routes;
}
