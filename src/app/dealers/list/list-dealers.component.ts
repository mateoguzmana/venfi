import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DealersService } from '../dealers.service';
import { LayoutService } from '../../layout/layout.service';
declare var jQuery: any;

@Component({
  selector: '[list-dealers]',
  templateUrl: './list-dealers.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-dealers.style.scss']
})
export class ListDealersComponent {
  
  StaticPath  :  String = "dealers";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;

  Dealers: Object = {};

  constructor(private layoutService: LayoutService, private dealersService: DealersService, private router: Router) {
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
    });
    
    this.LoadList();
  }

  ngOnInit(): void {
    let searchInput = jQuery('#table-search-input');
    searchInput
      .focus((e) => {
      jQuery(e.target).closest('.input-group').addClass('focus');
    })
      .focusout((e) => {
      jQuery(e.target).closest('.input-group').removeClass('focus');
    });
  }

  LoadList(){
    this.dealersService.getAllDealers().subscribe((result) => {
        this.Dealers = result;
    });
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.dealersService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

}
