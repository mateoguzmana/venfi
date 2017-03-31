import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { ViabilitiesService } from '../viabilities.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[see-viabilities]',
  template: require('./see-viabilities.template.html')
})
export class SeeViabilitiesComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "viabilities";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  routeFile = GlobalConfig.server+"/uploads/viabilities/1/";
  id: number;
  private sub: any;
  Viability: Object = {
      idviability: Number,
      date          : String,
      agreement     : String,
      consultant    : Number,
      consultantname: String,
      vehiclevalue  : String,
      quotas        : Number,
      vehiclereference: String,
      vehiclemodel : String,
      invoicevalue : String,
      nit           : String,
      name          : String,
      birthdate     : String,
      occupation    : String,
      income        : String,
      nitcodebtor   : String,
      namecodebtor  : String,
      incomecodebtor: String,
      note          : String,
      file          : String
  };

  constructor(private layoutService: LayoutService, private viabilitiesService: ViabilitiesService, private router: Router, private route: ActivatedRoute) {
    
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

    this.viabilitiesService.getViability(this.id).subscribe((result) => {
        this.Viability = result;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.Viability['date2'] = new Date().toISOString().slice(0,10);

    this.viabilitiesService.cloneViability(this.Viability).subscribe((result) => {
      if(result.state==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
        $("#btnCloseModalClone").click();
        this.router.navigate(['/app/viabilities/update', result.idviability]);
      }
    });
    
  }

}
