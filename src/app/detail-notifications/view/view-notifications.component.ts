import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { DetailNotificationsService } from '../detail-notifications.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[view-notifications]',
  template: require('./view-notifications.template.html')
})
export class ViewNotificationsComponent implements OnInit, OnDestroy {

  id: number;

  private sub: any;
  Notification: Object= {};
  routeFile = GlobalConfig.server;

  constructor(private detailNotificationsService: DetailNotificationsService, private router: Router, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });

    this.detailNotificationsService.changeState(this.id, 0).subscribe((result) => {
        
    });

    this.detailNotificationsService.getNotification(this.id).subscribe((result) => {
        this.Notification = result;

        if(this.Notification["idtypeapplication"]==2 && this.Notification["idtypeconsultant"]==2){

          if(this.Notification["idworkflow"]==0){

            //Load data of viability if it's a approve viability application.

            this.detailNotificationsService.getViabilityInfo(this.Notification["idapplication"]).subscribe((result) => {
              this.Notification["note"]  = result["note"];
              this.Notification["file2"] = result["file2"];
            });
          
          }else{

            //Load data of credit if it's a approve step credit application.

            this.detailNotificationsService.getCreditInfo(this.Notification["idapplication"], this.Notification["idworkflow"], this.id).subscribe((result) => {
              this.Notification["message"]  = result["message1"];
              this.Notification["note"]     = result["message2"];
              this.Notification["files"]    = result["files"];
            });
        
          }

        }else if(this.Notification["idtypeapplication"]==1 && this.Notification["idtypeconsultant"]==2){
            
            // If it's viability reject
            
            this.detailNotificationsService.getViabilityInfo2(this.Notification["idapplication"]).subscribe((result) => {
              this.Notification["note"]  = result["note"];
            });

        }

        // Define route of application "Viability" or "Credit application"

        if(this.Notification["idtypeapplication"]==1){

          //If type application is viability

          switch(this.Notification["idtypeconsultant"]){
            case 2:
              if(this.Notification["idtypnotification"]==1){
                // Viability approved
                this.Notification["routeApplication"] = '../../../viabilities/update/'; 
              }else{
                // Viability rejected
                this.Notification["routeApplication"] = '../../../viabilities/see/'; 
              }
              break;
            case 3:
              this.Notification["routeApplication"] = '../../../viabilities/inspect/'; 
              break;
          }

        }else{

          //If type applicaton is credit application

          switch(this.Notification["idtypeconsultant"]){
            case 2:
              this.Notification["routeApplication"] = '../../../credits/update/'; 
              break;
            case 3:
              this.Notification["routeApplication"] = '../../../credits/inspect/'; 
              break;
          }
          
        }

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
