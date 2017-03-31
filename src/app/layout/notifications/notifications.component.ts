import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppConfig } from '../../app.config';
import { LayoutService } from '../layout.service';
declare var jQuery: any;

@Component({
  selector: '[notifications]',
  templateUrl: './notifications.template.html'
})
export class Notifications implements OnInit {
  $el: any;
  config: any;
  layout: LayoutService;

  dateComplete: String;
  notifications: Object;
  totalNotifications: any; 

  constructor(el: ElementRef, config: AppConfig, private layoutService: LayoutService, private router: Router, private route: ActivatedRoute) {
    this.$el = jQuery(el.nativeElement);
    this.config = config;
    this.layout = layoutService;

    this.dateComplete = this.today();
    this.getNotifications();

    setInterval(() => { this.getNotifications() }, 2000*20);
  }

  getNotifications(){

    if(localStorage.getItem("check_point")){

    this.layoutService.getNotifications().subscribe((result) => {
        this.notifications = result;
        this.totalNotifications = this.notifications["length"];
        localStorage.setItem("totalNotifications", this.totalNotifications);
    });
    }
  }

  moveNotificationsDropdown(): void {
    jQuery('.sidebar-status .dropdown-toggle').after(jQuery('[notifications]').detach());
  }

  moveBackNotificationsDropdown(): void {
    jQuery('#notifications-dropdown-toggle').after(jQuery('[notifications]').detach());
  }

  ngOnInit(): void {
    this.config.onScreenSize(['sm', 'xs'], this.moveNotificationsDropdown);
    this.config.onScreenSize(['sm', 'xs'], this.moveBackNotificationsDropdown, false);

    if (this.config.isScreen('sm')) { this.moveNotificationsDropdown(); }
    if (this.config.isScreen('xs')) { this.moveNotificationsDropdown(); }

    jQuery('.sidebar-status').on('show.bs.dropdown', () => {
      jQuery('#sidebar').css('z-index', 2);
    }).on('hidden.bs.dropdown', () => {
      jQuery('#sidebar').css('z-index', '');
    });

    jQuery(document).on('change', '[data-toggle="buttons"] > label', ($event) => {
      let $input = jQuery($event.target).find('input');
      $input.trigger('change');
    });
  }

  // Time now 
  today () { 
    return ((new Date().getDate() < 10)?"0":"") + new Date().getDate() +"/"+(((new Date().getMonth()+1) < 10)?"0":"") + (new Date().getMonth()+1) +"/"+ new Date().getFullYear();
  }

  // For the time now
  timeNow () {
     return ((new Date().getHours() < 10)?"0":"") + new Date().getHours() +":"+ ((new Date().getMinutes() < 10)?"0":"") + new Date().getMinutes() +":"+ ((new Date().getSeconds() < 10)?"0":"") + new Date().getSeconds();
  }

  removeNotification(index){
     this.notifications["splice"](index,1);
     this.totalNotifications = this.notifications["length"];
  }
}
