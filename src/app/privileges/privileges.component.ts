import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrivilegesService } from './privileges.service';
import { LayoutService } from '../layout/layout.service';

@Component({
  selector: '[privileges]',
  template: require('./privileges.template.html')
})
export class PrivilegesComponent {

  //Privileges in all components
  StaticPath  :  String = "privileges";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  Roles: Object;

  Show:  Boolean = false;
  Rol:   Number;
  Total: Number;
  model: Object = {
    Rol: ""
  };
  
  data: Object = {
  };

  Pack: Object = {}

  constructor(private layoutService: LayoutService, private privilegesService: PrivilegesService, private router: Router) {

    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

    this.getActiveRoles();

  }

  getActiveRoles(){
      this.privilegesService.getActiveRoles().subscribe((result) => {
        this.Roles = result;
      });
  }

  ViewPrivileges(this){

    if(this.value==""){
    }else{
      this.privilegesService.getPrivileges($('#Rol option:selected').val()).subscribe((result) => {
        this.Menus = result;
      });
    }
  }

  Save(){
    this.Total = $('#TablePrivilegies tr').length;

    for(var i = 0; i < this.Total; i++){
      this.data[i] = {id: $('#idmenu'+i).val(), view: $('#v'+i).prop("checked"), enter: $('#e'+i).prop("checked"), actualize: $('#a'+i).prop("checked"), remove: $('#r'+i).prop("checked"), inspect: $('#c'+i).prop("checked")};
    }

    this.Pack = {
      len: this.Total,
      rol: $('#Rol option:selected').val(),
      data: this.data
    }

    this.privilegesService.updatePrivileges(this.Pack).subscribe((result) => {
        if(result){
          $("#MessageSuccess").fadeIn(500).delay(2000).fadeOut(1000);

        }
      });
  }

  Cancel(){
    $("#Rol").val(null);
    this.model = {
      Rol: ""
    };
    this.ViewPrivileges();
  }

}
