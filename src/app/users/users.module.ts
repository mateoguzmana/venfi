import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../components/datatables/datatables.module';

import { ListUsersComponent } from './list/list-users.component';
import { InsertUsersComponent } from './insert/insert-users.component';
import { UpdateUsersComponent } from './update/update-users.component';
import { UsersService } from './users.service';
import { LayoutService } from '../layout/layout.service';
import { SearchPipe } from './list/pipes/search-pipe';

export const routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  {path: 'list', component: ListUsersComponent},
  {path: 'insert', component: InsertUsersComponent},
  {path: 'update/:id', component: UpdateUsersComponent}
];

@NgModule({
  declarations: [
    ListUsersComponent,
    InsertUsersComponent,
    UpdateUsersComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    DataTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    UsersService,
    LayoutService
  ]
})
export default class UsersModule {
  static routes = routes;
}
