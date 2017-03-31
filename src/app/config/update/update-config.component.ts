import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { ConfigService } from '../config.service';
import { LayoutService } from '../../layout/layout.service';
import GlobalConfig = require('../../global.config');

@Component({
  selector: '[update-config]',
  template: require('./update-config.template.html')
})
export class UpdateConfigComponent implements OnInit {

  StaticPath  :  String = "config";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  routeLogo = GlobalConfig.server+"/uploads/config/logo.png";
  private sub: any;
  Config: Object = {
    habeasdata: String,
    sessiontime:Number
  };

  TypeDocuments   : Object;
  Workflows       : Object;
  ActiveWorkFlows : Object;

  constructor(private layoutService: LayoutService, private configService: ConfigService, private router: Router, private route: ActivatedRoute) {
    
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });
  }

  ngOnInit() {
    this.configService.getConfig().subscribe((result) => {
        this.Config = result;
    });
    this.LoadList();
  }

  LoadList(){
    this.configService.getAllTypeDocuments().subscribe((result) => {
        this.TypeDocuments = result;
    });
    this.configService.getAllWorkflow().subscribe((result) => {
        this.Workflows = result;
    });
    this.configService.getActiveWorkflow().subscribe((result) => {
        this.ActiveWorkFlows = result;
    });
  }

  onSubmit(){
    this.configService.updateConfig(this.Config).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
      }
    });

    var logoFile = $("#logofile")[0]["files"][0];

    if(logoFile){
      this.configService.uploadFile(logoFile).then((result) => {
        if(result["state"]==1){
          console.log("Logo upload success");
        }
      }, (error) => {
        console.error(error);
      });
    } 
  }

  preloadImage(evt){
      var file = evt.target.files[0];

      if(file){ //If input has file, execute this
        var reader = new FileReader();
        var div    = document.getElementById("preloadImage");
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.
            div.innerHTML = ['<img class="image" style="max-height:300px;max-width:300px;" src="', e.target.result,
                              '" title="', theFile.name, '"/>'].join('');
          };
        })(file);

        // Read in the image file as a data URL.
        reader.readAsDataURL(file);
      }else{ //If input hasn't file, remove content of div
        $("#preloadImage").html("");
      }
  }

  openModal(id){
    $('#myModal'+id).appendTo("body")["modal"]('show');
  }

  openModal2(id){
    $('#2myModal'+id).appendTo("body")["modal"]('show');
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.configService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

  changeStateWorkflow(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.configService.changeStateWorkflow(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

  checkArrayValue(id, array){
    var count = 0;

    for(var i = 0; i < array.length; i++){
      if(array[i]==id){
        count++;
      }
    }

    if(count>0){
      return true;
    }else{
      return false;
    }
  }

  loadCheckbox(arrayChecks=null){ // Function to load checkbox in new or edit type document
    var Workflows = this.ActiveWorkFlows;

    if(arrayChecks!=null && arrayChecks!==""){ // If array is diferent to empty or null, load array with checkboxes checked
     var arrayx = JSON.parse("[" + arrayChecks + "]");
     var content ='';
      content+='<table class="table">';
        for(var i in Workflows){
          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          if(this.checkArrayValue(Workflows[i]["idworkflow"], arrayx)){
            content+='<input id="'+Workflows[i]["idworkflow"]+'checkbox" type="checkbox" checked="checked">';
          }else{
            content+='<input id="'+Workflows[i]["idworkflow"]+'checkbox" type="checkbox">';
          }
          content+='<label for="'+Workflows[i]["idworkflow"]+'checkbox">'+Workflows[i]["name"]+'</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';
        }
      content+='</table>';
    }else{ // If array is empty or null, load checkboxes empty
      var content ='';
      content+='<table class="table">';
        for(var i in Workflows){
          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          content+='<input id="'+Workflows[i]["idworkflow"]+'checkbox" type="checkbox">';
          content+='<label for="'+Workflows[i]["idworkflow"]+'checkbox">'+Workflows[i]["name"]+'</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';
        }
      content+='</table>';
    }

    return content;
  }

  loadCheckboxOccupations(arrayChecks = null){
    var content = ''; //Define empty content

    if(arrayChecks!=null && arrayChecks!==""){ // If array is diferent to empty or null, load array with checkboxes checked
     var arrayx = JSON.parse("[" + arrayChecks + "]");
          
          content+='<table class="table">';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          if(this.checkArrayValue(1, arrayx)){
            content+='<input id="checkboxOccupation1" type="checkbox" checked="checked">';
          }else{
            content+='<input id="checkboxOccupation1" type="checkbox">';
          }
          content+='<label for="checkboxOccupation1">Empleado</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          if(this.checkArrayValue(2, arrayx)){
            content+='<input id="checkboxOccupation2" type="checkbox" checked="checked">';
          }else{
            content+='<input id="checkboxOccupation2" type="checkbox">';
          }
          content+='<label for="checkboxOccupation2">Estudiante</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          if(this.checkArrayValue(3, arrayx)){
            content+='<input id="checkboxOccupation3" type="checkbox" checked="checked">';
          }else{
            content+='<input id="checkboxOccupation3" type="checkbox">';
          }
          content+='<label for="checkboxOccupation3">Pensionado</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          if(this.checkArrayValue(4, arrayx)){
            content+='<input id="checkboxOccupation4" type="checkbox" checked="checked">';
          }else{
            content+='<input id="checkboxOccupation4" type="checkbox">';
          }
          content+='<label for="checkboxOccupation4">Independiente</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

      content+='</table>';

    }else{ // If array is empty or null, load checkboxes empty

      content+='<table class="table">';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          content+='<input id="checkboxOccupation1" type="checkbox">';
          content+='<label for="checkboxOccupation1">Empleado</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          content+='<input id="checkboxOccupation2" type="checkbox">';
          content+='<label for="checkboxOccupation2">Estudiante</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          content+='<input id="checkboxOccupation3" type="checkbox">';
          content+='<label for="checkboxOccupation3">Pensionado</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

          content+='<tr>';
          content+='<td>';
          content+='<div class="abc-checkbox abc-checkbox-primary">';
          content+='<input id="checkboxOccupation4" type="checkbox">';
          content+='<label for="checkboxOccupation4">Independiente</label>';
          content+='</div>';
          content+='</td>';
          content+='</tr>';

      content+='</table>';

    }

    return content;
  }

  newTypeDocument(){ //Function to insert input in tr null
    var checks = this.loadCheckbox(); 
    var checksOccupation = this.loadCheckboxOccupations(); 

    var content = ''; 
    content+= '<tr id="trNewTypeDocument">';
    content+='<td><div id="divNewTypeDocument" class="form-group"><input type="text" id="nameNewTypeDocument" class="form-control" placeholder="Nombre tipo de documento"><span style="display:none;" class="help-block"><strong>Por favor ingrese un nombre</strong></span></div></td>';
    content+='<td id="tdWorkflowNewTypeDocument">'+checks+'</td>';
    content+='<td><select id="typeNewTypeDocument" class="form-control"><option value="1" selected>Carga</option><option value="2">Respuesta</option></select></td>';
    content+='<td id="tdOccupationNewTypeDocument">'+checksOccupation+'</td>';
    content+='<td class="text-xs-right"><button id="btnAddNewTypeDocument" class="btn btn-success"><i class="fa fa-check"></i></button>';
    content+='&nbsp;<button id="btnCancelNewTypeDocument" class="btn btn-danger"><i class="fa fa-times"></i></button></td></tr>';

    $("#btnNewTypeDocument").prop('disabled', true);
    $("#tableTypeDocuments").find('tbody').append(content);
    
    localStorage.setItem('typeSelectedNew', "1");

    $("#typeNewTypeDocument").change(function(){
      localStorage.setItem('typeSelectedNew', $(this).val());
    });

    document.getElementById("btnAddNewTypeDocument").addEventListener('click', function() {
        $("#ContinueProcess").click();
    });

    document.getElementById("btnCancelNewTypeDocument").addEventListener('click', function() {
        $("#btnNewTypeDocument").prop('disabled', false);
        $("#trNewTypeDocument").remove();
    });
  }

  addNewTypeDocument(){ // Function to call service and save 
    var name = $("#nameNewTypeDocument").val();

    var totalchecked = $("#tdWorkflowNewTypeDocument input[type=checkbox]").length;
    var arraycheck = [];
    for(var i = 0; i < totalchecked; i++){ // Search checkbox with attribute checked and add to array
      if($("#tdWorkflowNewTypeDocument input[type=checkbox]").eq(i).is(":checked")){
        arraycheck.push(parseInt($("#tdWorkflowNewTypeDocument input[type=checkbox]").eq(i).attr("id").replace("checkbox","")));
      }
    }

    var totalchecked2 = $("#tdOccupationNewTypeDocument input[type=checkbox]").length;
    var arraycheck2 = [];
    for(var i = 0; i < totalchecked2; i++){ // Search checkbox with attribute checked and add to array
      if($("#tdOccupationNewTypeDocument input[type=checkbox]").eq(i).is(":checked")){
        arraycheck2.push(parseInt($("#tdOccupationNewTypeDocument input[type=checkbox]").eq(i).attr("id").replace("checkboxOccupation","")));
      }
    }

    var type = localStorage.getItem('typeSelectedNew');

    if(name){
      this.configService.insertTypeDocument(name, arraycheck, type, arraycheck2).subscribe((result) => {
        if(result==1){
          this.LoadList();
          $("#btnNewTypeDocument").prop('disabled', false);
          $("#trNewTypeDocument").remove();
        }
      });
    }else{
      $("#divNewTypeDocument").addClass("has-error");
      $("#divNewTypeDocument span").fadeIn(300).delay(700).fadeOut(300);
      setTimeout(()=>{ 
        $("#divNewTypeDocument").removeClass("has-error");
      }, 1000);        
    } 
  }

  updateTypeDocument(id){ // Function to print in tr input and data  
    var name          = $("#textTd"+id).html();
    var actualchecks  = $("#textWorkflow1"+id).html();
    var actualchecks2 = $("#textOccupation1"+id).html();
    var type = parseInt($("#textType"+id).attr("class").replace("textType",""));
    var selectType = "";
    if(type==1){
      selectType+="<select id='textType2"+id+"' class='form-control'><option value='1' selected>Carga</option><option value='2'>Respuesta</option></select>";
    }else{
      selectType+="<select id='textType2"+id+"' class='form-control'><option value='1'>Carga</option><option value='2' selected>Respuesta</option></select>";
    }

    var checks = this.loadCheckbox(actualchecks); 
    var checks2 = this.loadCheckboxOccupations(actualchecks2); 
    $("#textTd"+id).hide();
    $("#span1"+id).hide();
    $("#textWorkflow1"+id).hide();
    $("#textType"+id).hide();
    $("#textOccupation1"+id).hide();

    $("#tdName"+id).append('<div id="divUpdateTypeDocument'+id+'" class="form-group"><input type="text" value="'+name+'" class="form-control" id="inputName'+id+'"><span style="display:none;" class="help-block"><strong>Por favor ingrese un nombre</strong></span></div>');
    $("#tdWorkflow"+id).append('<span id="textWorkflow2'+id+'">'+checks+'</span>');
    $("#tdType"+id).append(selectType);
    $("#tdOccupation"+id).append('<span id="textOccupation2'+id+'">'+checks2+'</span>');
    $("#tdButtons"+id).append('<span id="span2'+id+'"><button id="btnUpdateTypeDocument" class="btn btn-success"><i class="fa fa-check"></i></button>&nbsp;<button id="btnCancelUpdateTypeDocument" class="btn btn-danger"><i class="fa fa-times"></i></button></span>');
  
    localStorage.setItem('id_temp', id);

    $("#textType2"+id).change(function(){
      localStorage.setItem('typeSelected'+id, $(this).val());
    });

    document.getElementById("btnUpdateTypeDocument").addEventListener('click', function() {
        $("#ContinueProcess2").click();
    });

    document.getElementById("btnCancelUpdateTypeDocument").addEventListener('click', function() {
        $("#span2"+id).remove();
        $("#textWorkflow2"+id).remove();
        $("#textType2"+id).remove();
        $("#textOccupation2"+id).remove();
        $("#inputName"+id).remove();
        $("#span1"+id).fadeIn();
        $("#textTd"+id).fadeIn();
        $("#textWorkflow1"+id).fadeIn();
        $("#textType"+id).fadeIn();
        $("#textOccupation1"+id).fadeIn();
    });
  }

  saveUpdateTypeDocument(){ // Function service to save data
    var id = localStorage.getItem('id_temp');
    var name = $("#inputName"+id).val();
    var type = parseInt(localStorage.getItem('typeSelected'+id));
    var nametype;
    if(type==1){
      nametype = "Carga";
    }else{
      nametype = "Respuesta";
    }
    var totalchecked = $("#textWorkflow2"+id+" input[type=checkbox]").length;
    var arraycheck = [];
    for(var i = 0; i < totalchecked; i++){ // Search checkbox with attribute checked and add to array
      if($("#textWorkflow2"+id+" input[type=checkbox]").eq(i).is(":checked")){
        arraycheck.push(parseInt($("#textWorkflow2"+id+" input[type=checkbox]").eq(i).attr("id").replace("checkbox","")));
      }
    }

    var totalchecked2 = $("#textOccupation2"+id+" input[type=checkbox]").length;
    var arraycheck2 = [];
    for(var i = 0; i < totalchecked2; i++){ // Search checkbox with attribute checked and add to array
      if($("#textOccupation2"+id+" input[type=checkbox]").eq(i).is(":checked")){
        arraycheck2.push(parseInt($("#textOccupation2"+id+" input[type=checkbox]").eq(i).attr("id").replace("checkboxOccupation","")));
      }
    }

    if(name){
      this.configService.updateTypeDocument(id, name, arraycheck.toString(), type, arraycheck2.toString()).subscribe((result) => {
        if(result==1){
          $("#span2"+id).remove();
          $("#textWorkflow2"+id).remove();
          $("#textOccupation2"+id).remove();
          $("#inputName"+id).remove();
          $("#textType2"+id).remove();
          $("#textTd"+id).html(name);
          $("#textWorkflow1"+id).html(arraycheck.toString());
          $("#textType"+id).html(nametype).fadeIn();
          $("#textOccupation1"+id).html(arraycheck2.toString());
          $("#textType"+id).attr("class", "textType"+type);
          $("#span1"+id).fadeIn();
          $("#textTd"+id).fadeIn();
          $("#textWorkflow1"+id).fadeIn();
          $("#textOccupation1"+id).fadeIn();
          localStorage.removeItem('id_temp');
        }
      });
    }else{
      $("#divUpdateTypeDocument"+id).addClass("has-error");
      $("#divUpdateTypeDocument"+id+" span").fadeIn(300).delay(700).fadeOut(300);
      setTimeout(()=>{ 
        $("#divUpdateTypeDocument"+id).removeClass("has-error");
      }, 1000);     
    } 
  }

  newWorkflow(){ //Function to insert input in tr null
    var content = ''; 
    content+= '<tr id="trNewWorkflow">';
    content+='<td><div id="divNewWorkflow" class="form-group"><input type="text" id="nameNewWorkflow" class="form-control" placeholder="Nombre del paso"><span style="display:none;" class="help-block"><strong>Por favor ingrese un nombre</strong></span></div></td>';
    content+='<td class="text-xs-right"><button id="btnAddNewWorkflow" class="btn btn-success"><i class="fa fa-check"></i></button>';
    content+='&nbsp;<button id="btnCancelNewWorkflow" class="btn btn-danger"><i class="fa fa-times"></i></button></td></tr>';

    $("#btnNewWorkflow").prop('disabled', true);
    $("#tableWorkflow").find('tbody').append(content);
    
    document.getElementById("btnAddNewWorkflow").addEventListener('click', function() {
        $("#2ContinueProcess").click();
    });

    document.getElementById("btnCancelNewWorkflow").addEventListener('click', function() {
        $("#btnNewWorkflow").prop('disabled', false);
        $("#trNewWorkflow").remove();
    });
  }

  addNewWorkflow(){ // Function to call service and save 
    var name = $("#nameNewWorkflow").val();

    if(name){
      this.configService.insertWorkflow(name).subscribe((result) => {
        if(result==1){
          this.LoadList();
          $("#btnNewWorkflow").prop('disabled', false);
          $("#trNewWorkflow").remove();
        }
      });
    }else{
      $("#divNewWorkflow").addClass("has-error");
      $("#divNewWorkflow span").fadeIn(300).delay(700).fadeOut(300);
      setTimeout(()=>{ 
        $("#divNewWorkflow").removeClass("has-error");
      }, 1000);        
    }
  }

  updateWorkflow(id){ // Function to print in tr input and data  
    var name = $("#2textTd"+id).html();
    $("#2textTd"+id).hide();
    $("#2span1"+id).hide();

    $("#2tdName"+id).append('<div id="divUpdateWorkflow'+id+'" class="form-group"><input type="text" value="'+name+'" class="form-control" id="2inputName'+id+'"><span style="display:none;" class="help-block"><strong>Por favor ingrese un nombre</strong></span></div>');
    $("#2tdButtons"+id).append('<span id="2span2'+id+'"><button id="btnUpdateWorkflow" class="btn btn-success"><i class="fa fa-check"></i></button>&nbsp;<button id="btnCancelUpdateWorkflow" class="btn btn-danger"><i class="fa fa-times"></i></button></span>');
  
    localStorage.setItem('id_temp', id);

    document.getElementById("btnUpdateWorkflow").addEventListener('click', function() {
        $("#2ContinueProcess2").click();
    });

    document.getElementById("btnCancelUpdateWorkflow").addEventListener('click', function() {
        $("#2span2"+id).remove();
        $("#2inputName"+id).remove();
        $("#2span1"+id).fadeIn();
        $("#2textTd"+id).fadeIn();
    });
  }

  saveUpdateWorkflow(){ // Function service to save data
    var id = localStorage.getItem('id_temp');
    var name = $("#2inputName"+id).val();

    if(name){
      this.configService.updateWorkflow(id, name).subscribe((result) => {
        if(result==1){
          $("#2span2"+id).remove();
          $("#2inputName"+id).remove();
          $("#2textTd"+id).html(name);
          $("#2span1"+id).fadeIn();
          $("#2textTd"+id).fadeIn();
          localStorage.removeItem('id_temp');
        }
      });
    }else{
      $("#divUpdateWorkflow"+id).addClass("has-error");
      $("#divUpdateWorkflow"+id+" span").fadeIn(300).delay(700).fadeOut(300);
      setTimeout(()=>{ 
        $("#divUpdateWorkflow"+id).removeClass("has-error");
      }, 1000);     
    } 
  }
}
