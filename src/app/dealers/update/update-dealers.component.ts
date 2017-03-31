import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { DealersService } from '../dealers.service';
import { LayoutService } from '../../layout/layout.service';

@Component({
  selector: '[update-dealers]',
  template: require('./update-dealers.template.html')
})
export class UpdateDealersComponent implements OnInit, OnDestroy {

  StaticPath  :  String = "dealers";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  id: number;

  private sub: any;
  Dealer: Object= {};

  constructor(private layoutService: LayoutService, private dealersService: DealersService, private router: Router, private route: ActivatedRoute) {
    
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

    this.dealersService.getDealer(this.id).subscribe((result) => {
        this.Dealer = result;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.dealersService.updateDealer(this.Dealer).subscribe((result) => {
      if(result==1){
        $("#MessageSuccess").fadeIn().delay(2000).fadeOut();
      }
    });
    
  }

}
