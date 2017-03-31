import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { RolesService } from '../roles.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[update-roles]',
  template: require('./update-roles.template.html')
})
export class UpdateRolesComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "roles";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  routeFile = GlobalConfig.server+"/uploads/roles/";
  id: number;
  private sub: any;
  Role: Object = {
    idrole: Number,
    name: String
  };
  
  Menus: Object;
  Total: Number;
  data: Object = {};
  Pack: Object = {};


  constructor(private layoutService: LayoutService, private rolesService: RolesService, private router: Router, private route: ActivatedRoute) {
    
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });

    this.rolesService.getRole(this.id).subscribe((result) => {
        this.Role = result;
        this.rolesService.getMenu(this.Role["idrole"]).subscribe((result) => {
          this.Menus = result;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    var file = $("#photo")[0]["files"][0];

    if(file){
      this.rolesService.uploadPhoto(this.id, file).then((result) => {
            if(result["state"]==1){
                this.rolesService.updateRole(this.Role).subscribe((result) => {
                  if(result==1){
                  this.Save();
                  $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
                }
              });
            }
        }, (error) => {
            console.error(error);
        });
    }else{
      this.rolesService.updateRole(this.Role).subscribe((result) => {
        if(result==1){
          this.Save();
          $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
        }
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
      rol: this.Role["idrole"],
      data: this.data
    }

    this.rolesService.updatePrivileges(this.Pack).subscribe((result) => {
        if(result){
          $("#MessageSuccess").fadeIn(500).delay(2000).fadeOut(1000);

        }
      });
  }

}
