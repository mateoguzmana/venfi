import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { UsersService } from '../users.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[update-users]',
  template: require('./update-users.template.html')
})
export class UpdateUsersComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "users";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  id: number;

  private sub: any;
  Roles: Object;
  User: Object = {
    iduser: Number,
    nit:  String,
    name: String,
    lastname: String,
    email: String,
    user: String,
    password: String,
    idrole: Number
  };

  constructor(private layoutService: LayoutService, private usersService: UsersService, private router: Router, private route: ActivatedRoute) {
    
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

    this.usersService.getUser(this.id).subscribe((result) => {
        this.User = result;
        this.usersService.getActiveRoles().subscribe((result) => {
          this.Roles = result;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.usersService.updateUser(this.User).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
        this.router.navigate(['/app/users/list']);
      }
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
