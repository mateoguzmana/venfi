import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { RolesService } from '../roles.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[insert-roles]',
  template: require('./insert-roles.template.html')
})
export class InsertRolesComponent {

  StaticPath  :  String = "roles";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  Menus: Object;
  name: String; 
  Role: Object = {
      name: name
  };

  Total: Number;
  data: Object = {};
  Pack: Object = {};

  constructor(private layoutService: LayoutService, private rolesService: RolesService, private router: Router) {
  
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

    this.rolesService.getMenu(0).subscribe((result) => {
        this.Menus = result;
    });

  }

  onSubmit(){
    var file = $("#photo")[0]["files"][0];
    if(file){
        this.rolesService.insertRole(this.Role, file).then((result) => {
            if(result["state"]==1){
              this.Save(result["id"]);
              $("#MessageSuccess").fadeIn().delay(1000);
              this.router.navigate(['/app/roles/list']);
            }
        }, (error) => {
            console.error(error);
        });
    }else{
      alert("La imagen debe de ser cargada");
    } 
  }

  Save(role){
    this.Total = $('#TablePrivilegies tr').length;

    for(var i = 0; i < this.Total; i++){
      this.data[i] = {id: $('#idmenu'+i).val(), view: $('#v'+i).prop("checked"), enter: $('#e'+i).prop("checked"), actualize: $('#a'+i).prop("checked"), remove: $('#r'+i).prop("checked"), inspect: $('#c'+i).prop("checked")};
    }

    this.Pack = {
      len: this.Total,
      rol: role,
      data: this.data
    }

    this.rolesService.updatePrivileges(this.Pack).subscribe((result) => {
        if(result){
          $("#MessageSuccess").fadeIn(500).delay(2000).fadeOut(1000);

        }
    });
  }
}
