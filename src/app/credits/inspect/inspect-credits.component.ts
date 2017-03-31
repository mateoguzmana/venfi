import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import { CreditsService } from '../credits.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[inspect-credits]',
  template: require('./inspect-credits.template.html'),
  styleUrls: ['./inspect-credits.style.scss']
})
export class InspectCreditsComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "credits";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
  Inspect     :  Number;

  id: number;
  creditValidate: Boolean;
  typedocuments: any;
  routeFile = GlobalConfig.server+"/uploads/credits/responsedocuments/";

  private sub: any;
  Credit: Object = {
      idcredit            : "",
      iddebtor            : "",
      date                : new Date().toISOString().slice(0,10),
      note                : "",
      debtor: {
        idperson            : "",
        nit                 : "",
        name                : "",
        address             : "", 
        cell                : "",
        phone1              : "", 
        phone2              : "", 
        email               : "", 
        company             : "", 
        monthlyincome       : "", 
        monthlyexpenses     : "", 
        otherincome         : "", 
        actives             : "", 
        liabilities         : "", 
        patrimony           : "", 
        otherincomeconcept  : "", 
        namereference       : "", 
        phonereference      : "", 
        observations        : ""
      },
      codebtors: [
        {
          nitcodebtor                : "",
          namecodebtor               : "",
          addresscodebtor            : "", 
          cellcodebtor               : "", 
          phone1codebtor             : "", 
          phone2codebtor             : "", 
          emailcodebtor              : "", 
          companycodebtor            : "", 
          monthlyincomecodebtor      : "", 
          monthlyexpensescodebtor    : "", 
          otherincomecodebtor        : "", 
          activescodebtor            : "", 
          liabilitiescodebtor        : "", 
          patrimonycodebtor          : "", 
          otherincomeconceptcodebtor : "", 
          namereferencecodebtor      : "", 
          phonereferencecodebtor     : "", 
          observationscodebtor       : ""
        }
      ]
  };

  constructor(private _location: Location, private layoutService: LayoutService, private creditsService: CreditsService, private router: Router, private route: ActivatedRoute) {
    
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

    this.creditsService.getCredit(this.id).subscribe((result) => {
        this.Credit = result;
        this.Credit["debtor"]["typedocument"] = "";
        this.creditsService.getDocumentsForResponse(this.id, this.Credit["workflow"]).subscribe((result) => {
          this.Credit["responsedocuments"] = result;
        }); 

        this.creditsService.getTypeDocumentsForResponse(this.Credit["workflow"]).subscribe((result) => {
          this.typedocuments = result;
        }); 
        
        this.creditsService.validateCredit(this.id).subscribe((result) => {
          this.creditValidate = result;
        });
    }); 
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  BackUrl() {
    this._location.back();
  }

  onSubmit(){

  }

  approveCredit(){
    this.creditsService.approveCredit(this.id, this.Credit["note"], this.Credit["workflow"]).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess .modal-header").fadeOut(100);
        $("#MessageSuccess .modal-footer").fadeOut(100);
        $("#MessageSuccess .modal-body").html("<div class='alert alert-success text-md-center'><h6><strong>Solicitud de crédito aprobada correctamente.</strong></h6></div>").fadeIn(500);
        setTimeout(function(){
          $("#myModalApprove .close-modal").click();
          $("#btnExit").click();
        }, 2000);
      }
    });
  }

  rejectCredit(){
    this.creditsService.rejectCredit(this.id, this.Credit["note"]).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess1 .modal-header").fadeOut(100);
        $("#MessageSuccess1 .modal-footer").fadeOut(100);
        $("#MessageSuccess1 .modal-body").html("<div class='alert alert-success text-md-center'><h6><strong>Solicitud de crédito rechazada correctamente.</strong></h6></div>").fadeIn(500);
        setTimeout(function(){
          $("#myModalReject .close-modal").click();
          $("#btnExit").click();
        }, 2000);
      }
    });
  }

  changeSelectDocument(){
    var input  = "typedocument";
    var input2 = "document";

    if(this.checkInputs(input, input2)){
      var file = $("#"+input2)[0]["files"][0];
      var type = $("#"+input).val();

      this.creditsService.uploadDocumentForResponse(this.id, type, this.Credit["workflow"], file).then((result) => {
            if(result["state"]==1){
            this.Credit["responsedocuments"].push(result["data"]);
            $("#"+input2).val("");
            $("#"+input).val("");
              
            }
        }, (error) => {
            console.error(error);
      });
    }else{
      var x;
    }
    
  }

  checkInputs(input, input2){
    if($("#"+input).val()!="" && $("#"+input2).val()!=""){
      return true;
    }else{
      return false;
    }
  }

  DeleteDocument(id){
    this.creditsService.DeleteDocumentForResponse(id).subscribe((result) => {
      if(result.state==1){
        $("#rowdocument"+id).html("<td class='alert alert-success text-xs-center' colspan='3'>Se ha eliminado el documento correctamente.</td>").fadeIn(1000).delay(1000).fadeOut(1500);
      }
    });
  }


}
