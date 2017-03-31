import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../components/datatables/datatables.module';

import { ListNotificationsComponent } from './list/list-notifications.component';
import { ViewNotificationsComponent } from './view/view-notifications.component';
import { DetailNotificationsService } from './detail-notifications.service';
import { LayoutService } from '../layout/layout.service';
import { SearchPipe } from './list/pipes/search-pipe';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListNotificationsComponent},
  {path: 'view/:id', component: ViewNotificationsComponent}
];

@NgModule({
  declarations: [
    ListNotificationsComponent,
    ViewNotificationsComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    DetailNotificationsService,
    LayoutService
  ]
})
export default class DealersModule {
  static routes = routes;
}
