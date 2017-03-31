import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { LayoutService } from '../../layout/layout.service';
declare var jQuery: any;

@Component({
  selector: '[list-users]',
  templateUrl: './list-users.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-users.style.scss']
})
export class ListUsersComponent {
  
  StaticPath  :  String = "users";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  Users: Object;

  constructor(private layoutService: LayoutService, private usersService: UsersService, private router: Router) {
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });
    
    this.LoadList();
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }

  LoadList(){
    this.usersService.getAllUsers().subscribe((result) => {
        this.Users = result;
    });
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.usersService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

}
