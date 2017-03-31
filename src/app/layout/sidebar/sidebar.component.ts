import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../app.config';
import { LayoutService } from '../layout.service';
import GlobalConfig = require('../../global.config');
declare var jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'
})

export class Sidebar implements OnInit {
  $el: any;
  config: any;
  router: Router;
  layout: LayoutService;
  location: Location;
  Menus: Object;
  Name: String = localStorage.getItem('name');
  navStatic = localStorage.getItem('nav-static');
  routeFile = GlobalConfig.server+"/uploads/config/logo.png";
  routePhoto = GlobalConfig.server+"/uploads/roles/"+localStorage.getItem('photo');

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location, private layoutService: LayoutService,) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;
    this.layout = layoutService;
  }

  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a#' + location.path().split('/')[2]);

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in').css('height', '')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });

    this.layout.GetMenu().subscribe((result) => {
      this.Menus = result; 
    });
  }
}
