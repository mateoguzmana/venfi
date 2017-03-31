import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../components/datatables/datatables.module';

import { ListDealersComponent } from './list/list-dealers.component';
import { InsertDealersComponent } from './insert/insert-dealers.component';
import { UpdateDealersComponent } from './update/update-dealers.component';
import { DealersService } from './dealers.service';
import { LayoutService } from '../layout/layout.service';
import { SearchPipe } from './list/pipes/search-pipe';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListDealersComponent},
  {path: 'insert', component: InsertDealersComponent},
  {path: 'update/:id', component: UpdateDealersComponent}
];

@NgModule({
  declarations: [
    ListDealersComponent,
    InsertDealersComponent,
    UpdateDealersComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    DealersService,
    LayoutService
  ]
})
export default class DealersModule {
  static routes = routes;
}
