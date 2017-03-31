import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DetailNotificationsService } from '../detail-notifications.service';
declare var jQuery: any;

@Component({
  selector: '[list-notifications]',
  templateUrl: './list-notifications.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-notifications.style.scss']
})
export class ListNotificationsComponent {
  
  Notifications: Object = {};

  constructor(private detailNotificationsService: DetailNotificationsService, private router: Router) {
        
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
    this.detailNotificationsService.getAllNotifications().subscribe((result) => {
        this.Notifications = result;
    });
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.detailNotificationsService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

}
