import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { ViabilitiesService } from '../viabilities.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[update-viabilities]',
  template: require('./update-viabilities.template.html')
})
export class UpdateViabilitiesComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "viabilities";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  filesToUpload: Array<File>;
  routeFile = GlobalConfig.server+"/uploads/viabilities/1/";
  id: number;
  private sub: any;
  dealers        : Object;
  Viability: Object = {
      idviability: Number,
      date            : String,
      agreement       : Number,
      consultant      : Number,
      consultantname  : String,
      vehiclevalue    : String,
      quotas          : Number,
      vehiclereference: String,
      vehiclemodel    : String,
      invoicevalue    : String,
      nit             : String,
      name            : String,
      birthdate       : String,
      occupation      : String,
      income          : String,
      nitcodebtor     : String,
      namecodebtor    : String,
      incomecodebtor  : String,
      file            : String
  };

  constructor(private layoutService: LayoutService, private viabilitiesService: ViabilitiesService, private router: Router, private route: ActivatedRoute) {
    
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

    this.filesToUpload = [];

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
    });

    this.viabilitiesService.getViability(this.id).subscribe((result) => {
        this.Viability = result;
        this.viabilitiesService.getDealers().subscribe((result) => {
          this.dealers = result;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.viabilitiesService.updateViability(this.Viability).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
        this.router.navigate(['/app/viabilities/list']);
      }
    });
    
  }

  printViability(id){
    this.viabilitiesService.printViability(id);
  }

  fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
  }

  uploadFile() {
    this.viabilitiesService.uploadFile(this.id, [], this.filesToUpload).then((result) => {
            if(result["state"]==1){
              $("#UploadSuccess").fadeIn().delay(2000).fadeOut();
              this.Viability["file"]=this.id+".pdf";
              $("#divViewFile").hide();
              $("#divViewFile").fadeIn();
            }
        }, (error) => {
            console.error(error);
      });
  }

  // Viability form validation
  validateViability(){
    
    // Validation all address
    $(".agreement").each(function(){
      if(!$(this).val()){
        
        $(this).after("<div class='alert alert-danger div-error'>Por favor seleccione un convenio</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    //Validation all money inputs
    $(".money").each(function(){
      if(!$(this).val()){
        
        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un valor</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val()<0){
          
          $(this).after("<div class='alert alert-danger div-error'>El valor debe de ser mayor o igual a cero.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    //Credits quotas validation
    if(!$("#quotas").val()){
      this.hasErrorInput("#quotas", "Por favor ingrese un número de cuotas.");
      return false;
    }else{
      if($("#quotas").val()<2){
        this.hasErrorInput("#quotas", "El número de cuotas debe de ser mayor o igual a 2.");
        return false;
      }
    }

    //Validation nits
    $(".nit").each(function(){

      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un número de cédula</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<5){
          
          $(this).after("<div class='alert alert-danger div-error'>El número de cédula debe contener más de 5 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation models
    $(".model").each(function(){

      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un modelo</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length!=4){

          $(this).after("<div class='alert alert-danger div-error'>El modelo debe contener 4 caracteres. Ej: 2024.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    // Validation all persons name
    $(".name").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un nombre</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        var regex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ \s]+$/;
        if(!regex.test($(this).val())){

          $(this).after("<div class='alert alert-danger div-error'>El nombre debe contener solo letras.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    // Validation all inputs occupations
    $(".occupation").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese una ocupación.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all inputs date
    $(".date").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor seleccione una fecha.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    // Validation all inputs refence
    $(".vehiclereference").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese una referencia del vehiculo.</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }
    });

    $("#isComplete").fadeIn(500).delay(1000).fadeOut(500);

  }

  hasErrorInput(input, message){
    $(input).after("<div class='alert alert-danger div-error'>"+message+"</div>");
    $(".div-error").delay(1000).fadeOut(500)
    $(input).focus();
  }
}
