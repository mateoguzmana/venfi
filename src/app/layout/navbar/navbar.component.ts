import { Component, EventEmitter, OnInit, ElementRef, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from '../../app.config';
import { LoginService } from '../../login/login.service';
import GlobalConfig = require('../../global.config');
declare var jQuery: any;

@Component({
  selector: '[navbar]',
  templateUrl: './navbar.template.html'
})
export class Navbar implements OnInit {
  @Output() toggleSidebarEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleChatEvent: EventEmitter<any> = new EventEmitter();
  $el: any;
  config: any;
  router: Router;
  login: LoginService;
  Name: String = localStorage.getItem('name');
  routePhoto = GlobalConfig.server+"/uploads/roles/"+localStorage.getItem('photo');
  routeFile = GlobalConfig.server+"/uploads/config/logo.png";
  totalNotifications: any;

  constructor(el: ElementRef, config: AppConfig, router: Router, login: LoginService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.login = login;
    this.getTotalNotifications();

    setInterval(() => { this.getTotalNotifications() }, 2000*5);
  }

  Logout(){
    this.login.logout();
  }

  toggleSidebar(state): void {
    this.toggleSidebarEvent.emit(state);
  }

  toggleChat(): void {
    this.toggleChatEvent.emit(null);
  }

  onDashboardSearch(f): void {
    this.router.navigate(['/app', 'extra', 'search'], { queryParams: { search: f.value.search } });
  }

  ngOnInit(): void {
    setTimeout(() => {
      let $chatNotification = jQuery('#chat-notification');
      $chatNotification.removeClass('hide').addClass('animated fadeIn')
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', () => {
          $chatNotification.removeClass('animated fadeIn');
          setTimeout(() => {
            $chatNotification.addClass('animated fadeOut')
              .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd' +
                ' oanimationend animationend', () => {
                $chatNotification.addClass('hide');
              });
          }, 8000);
        });
      $chatNotification.siblings('#toggle-chat')
        .append('<i class="chat-notification-sing animated bounceIn"></i>');
    }, 4000);

    this.$el.find('.input-group-addon + .form-control').on('blur focus', function(e): void {
      jQuery(this).parents('.input-group')
        [e.type === 'focus' ? 'addClass' : 'removeClass']('focus');
    });
  }

  getTotalNotifications(){
    this.totalNotifications = localStorage.getItem("totalNotifications");
  }
}
