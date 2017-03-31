import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Select2OptionData } from 'ng2-select2';
import { CreditsService } from '../credits.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[update-credits]',
  template: require('./update-credits.template.html'),
  styleUrls: ['./update-credits.style.scss']
})
export class UpdateCreditsComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "credits";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  id: number;
  creditValidate : Boolean;
  typedocuments  : any;
  listworkflow   : any;
  routeFile = GlobalConfig.server+"/uploads/credits/documents/";

  private sub: any;
  Credit: Object = {
      idcredit            : "",
      iddebtor            : "",
      date                : new Date().toISOString().slice(0,10),
      debtor: {
        idperson            : "",
        nit                 : "",
        name                : "",
        occupation          : "",
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
          occupationcodebtor         : "",
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
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });

    this.creditsService.getCredit(this.id).subscribe((result) => {
        this.Credit = result;
        this.Credit["debtor"]["typedocument"] = "";

        this.creditsService.getTypeDocuments(this.Credit["workflow"]).subscribe((result) => {
          this.typedocuments = result;
        }); 

        this.creditsService.getWorkflow().subscribe((result) => {
          this.listworkflow = result;
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

  printCredit(){
    window.open(GlobalConfig.server+"/credits/print/"+this.id+".pdf");
  }

  onSubmit(){
    this.creditsService.updateCredit(this.Credit).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
      }
    });
    
  }

  SendCredit(){
    this.creditsService.SendCredit(this.Credit["idcredit"]).subscribe((result) => {
      if(result.state==1){
        $("#MessageSuccess").fadeIn().delay(1000);
        this.router.navigate(['/app/credits/list']);
      }else{
        $("#MessageError").fadeIn().delay(1000);
      }
    });
  }

  StepTwo(){
    this.creditsService.StepTwo(this.Credit).subscribe((result) => {
      if(result.state==1){
        $("#MessageAutomaticSave").fadeIn(500).delay(500).fadeOut(500);  
        
        this.creditsService.validateCredit(this.id).subscribe((result) => {
          this.creditValidate = result;
        });
      }
    });
  }

  newTab(){
    this.Credit["codebtors"].push({ namecodebtor: "", nitcodebtor:"", occupationcodebtor: "", addresscodebtor: "", cellcodebtor: "", phone1codebtor: "", phone2codebtor: "", emailcodebtor: "", companycodebtor: "", monthlyincomecodebtor: "", monthlyexpensescodebtor: "", otherincomecodebtor: "", activescodebtor: "", liabilitiescodebtor: "", patrimonycodebtor: "", otherincomeconceptcodebtor: "", namereferencecodebtor: "", phonereferencecodebtor: "", observationscodebtor: "" });
  }

  DeleteTab(tab){
    this.Credit["codebtors"].splice(tab,1);
  }

  AutomaticSave(){
      this.StepTwo();
  }

  changeSelectDocument(id, input, input2, index){
    
    if(this.checkInputs(input, input2)){
      var file = $("#"+input2)[0]["files"][0];
      var type = $("#"+input).val();

      this.creditsService.uploadDocument(this.id, id, type, file).then((result) => {
            if(result["state"]==1){
              if(index!==undefined){
                this.Credit["codebtors"][index]["documents"].push(result["data"]);
                console.log(index)
              }else{
                this.Credit["debtor"]["documents"].push(result["data"]);
              }
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

  DeleteDocument(id, index){
    this.creditsService.DeleteDocument(id).subscribe((result) => {
      if(result.state==1){
        $("#rowdocument"+id).html("<td class='alert alert-success text-xs-center' colspan='3'>Se ha eliminado el documento correctamente.</td>").fadeIn(1000).delay(1000).fadeOut(1500);
      }
    });
  }

//Form validation 

  ValidateForm(){

    //Credits quotas validation
    if(!$("#quotas").val()){
      $("#tabdatacredit").click();
      this.hasErrorInput("#quotas", "Por favor ingrese un número de cuotas");
      return false;
    }

    //Validation nits
    $(".nit").each(function(){

      if(!$(this).val()){

        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un número de cédula</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<5){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El número de cédula debe contener más de 5 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation phones
    $(".phone").each(function(){

      if(!$(this).val()){

        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un número de telefono</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<7){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El télefono debe contener más de 7 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation cellphones
    $(".cellphone").each(function(){

      if(!$(this).val()){

        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un número de celular</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<10){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El télefono debe contener más de 10 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation mails
    $(".mail").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un email</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test($(this).val())){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El email debe contener un @ y un punto. Ej: mail@company.com</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    // Validation all persons name
    $(".name").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un nombre</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        var regex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ \s]+$/;
        if(!regex.test($(this).val())){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El nombre debe contener solo letras.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    // Validation all occupations
    $(".occupation").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor seleccione una ocupación</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all address
    $(".address").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese una dirección</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all companies
    $(".company").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese una empresa</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all concepts other income
    $(".otherincomeconcept").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un concepto de otros ingresos.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all inputs observations
    $(".observation").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un concepto de otros ingresos.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });


    //Validation all money inputs
    $(".money").each(function(){
      if(!$(this).val()){
        
        var tab = $(this).data("tab");
        
        $("#"+tab).click();
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un valor</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val()<0){
          
          var tab = $(this).data("tab");
        
          $("#"+tab).click();
          $(this).after("<div class='alert alert-danger div-error'>El valor debe de ser mayor o igual a cero.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    $("#MessageValidInputs").fadeIn(500).delay(500).fadeOut(500);  
  }

  hasErrorInput(input, message){
    $(input).after("<div class='alert alert-danger div-error'>"+message+"</div>");
    $(".div-error").delay(1000).fadeOut(500)
    $(input).focus();
  }
}
