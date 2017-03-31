import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { ViabilitiesService } from '../viabilities.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[inspect-viabilities]',
  template: require('./inspect-viabilities.template.html')
})
export class InspectViabilitiesComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "viabilities";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
  Inspect     :  Number;


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
      vehiclemodel  : String,
      invoicevalue  : String,
      nit           : String,
      name          : String,
      income        : String,
      nitcodebtor   : String,
      namecodebtor  : String,
      incomecodebtor: String,
      note          : String,
      finalvalue    : String,
      safevalue     : String,
      file          : String
  };

  constructor(private layoutService: LayoutService, private viabilitiesService: ViabilitiesService, private router: Router, private route: ActivatedRoute) {
    
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
        this.Inspect   = result[0].inspect;
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

  ApproveViability(id, nit, name, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, note, finalvalue, safevalue){
    var file = $("#file2")[0]["files"][0];

    if(file){
      this.viabilitiesService.ApproveViability(id, nit, name, occupation, income, nitcodebtor, namecodebtor, incomecodebtor, note, finalvalue, safevalue).subscribe((result) => {
        if(result==1){
          $("#MessageSuccess .modal-header").fadeOut(100);
          $("#MessageSuccess .modal-footer").fadeOut(100);
          $("#MessageSuccess .modal-body").html("<div class='alert alert-success text-md-center'><h6><strong>Estudio de viabilidad aprobado correctamente.</strong></h6></div>").fadeIn(500);
          setTimeout(function(){
            $("#myModalApprove .close-modal").click();
            $("#btnExit").click();
          }, 2000);
        }
      });    
      
      this.viabilitiesService.uploadFile2(this.id, file).then((result) => {
        if(result["state"]==1){
          console.log("Upload file success");
        }
      }, (error) => {
          console.error(error);
      });
    
    }else{
        $("#file2").after("<div class='alert alert-danger div-error'>Por favor seleccione un archivo.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $("#file2").focus(); 
    }
  }

  RejectViability(id, nit, note){
    this.viabilitiesService.RejectViability(id, nit, note).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess1 .modal-header").fadeOut(100);
        $("#MessageSuccess1 .modal-footer").fadeOut(100);
        $("#MessageSuccess1 .modal-body").html("<div class='alert alert-success text-md-center'><h6><strong>Estudio de viabilidad rechazado correctamente.</strong></h6></div>").fadeIn(500);
        setTimeout(function(){
          $("#myModalReject .close-modal").click();
          $("#btnExit").click();
        }, 2000);
      }
    });    
  }
}
