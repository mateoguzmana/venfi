import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { DealersService } from '../dealers.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[insert-dealers]',
  template: require('./insert-dealers.template.html')
})
export class InsertDealersComponent {

  StaticPath  :  String = "dealers";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
   
  Dealer: Object = {
      name          : "",
      nit           : "",
      namelegal     : "",
      nitlegal      : "",
      nitcommerce   : "",
      rut           : "",
      addresslegal  : "",
      nitmanager    : "",
      namemanager   : "",
      cellmanager   : "",
      phonemanager  : "",
      addressmanager: ""
  };

  constructor(private layoutService: LayoutService, private dealersService: DealersService, private router: Router) {
  
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });

  }

  onSubmit(){
    this.dealersService.insertDealer(this.Dealer).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(1000);
        this.router.navigate(['/app/dealers/list']);
      }
    });
    
  }
}
