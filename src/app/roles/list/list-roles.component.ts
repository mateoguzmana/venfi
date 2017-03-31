import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { RolesService } from '../roles.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[list-roles]',
  template: require('./list-roles.template.html')
})
export class ListRolesComponent {

  StaticPath  :  String = "roles";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  Roles: Object;

  constructor(private layoutService: LayoutService, private rolesService: RolesService, private router: Router) {
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });
    
    this.LoadList();
  }

  LoadList(){
    this.rolesService.getAllRoles().subscribe((result) => {
        this.Roles = result;
    });
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.rolesService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }
}
