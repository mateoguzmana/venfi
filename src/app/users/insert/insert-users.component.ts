import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { UsersService } from '../users.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[insert-users]',
  template: require('./insert-users.template.html')
})
export class InsertUsersComponent {

  StaticPath  :  String = "users";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
  
  Roles: Object;
  User: Object = {
      nit     : "", 
      name    : "",
      lastname: "",
      email   : "",
      user    : "",
      password: "",
      idrole  : ""
  };

  constructor(private layoutService: LayoutService, private usersService: UsersService, private router: Router) {
  
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

    this.getActiveRoles();

  }

  onSubmit(){
    this.usersService.insertUser(this.User).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(1000);
        this.router.navigate(['/app/users/list']);
      }
    });
    
  }

  getActiveRoles(){
      this.usersService.getActiveRoles().subscribe((result) => {
        this.Roles = result;
      });
  }

  // User form validation
  validateUser(){

    //Validation nit
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


    // Validation name
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

    // Validation lastname
    $(".lastname").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un apellido</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        var regex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ \s]+$/;
        if(!regex.test($(this).val())){

          $(this).after("<div class='alert alert-danger div-error'>El apellido debe contener solo letras.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    //Validation email
    $(".email").each(function(){
      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un email</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test($(this).val())){

          $(this).after("<div class='alert alert-danger div-error'>El email debe contener un @ y un punto. Ej: mail@company.com</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }

      }
    });

    //Validation user
    $(".user").each(function(){

      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese un usuario</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<5){
          
          $(this).after("<div class='alert alert-danger div-error'>El usuario debe contener más de 5 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation password
    $(".password").each(function(){

      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor ingrese una contraseña</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }else{
        if($(this).val().length<6){
          
          $(this).after("<div class='alert alert-danger div-error'>La contraseña debe contener más de 6 carácteres.</div>");
          $(".div-error").delay(1500).fadeOut(500);
          $(this).focus(); 
          
          return false;
        }
      }

    });

    //Validation role
    $(".role").each(function(){

      if(!$(this).val()){

        $(this).after("<div class='alert alert-danger div-error'>Por favor seleccione un rol</div>");
        $(".div-error").delay(1500).fadeOut(500);
        $(this).focus();

        return false;

      }

    });

  }
}
