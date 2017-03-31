import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CreditsService } from '../credits.service';
import { LayoutService } from '../../layout/layout.service';
declare var jQuery: any;

@Component({
  selector: '[list-credits]',
  templateUrl: './list-credits.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-credits.style.scss']
})
export class ListCreditsComponent {
  
  StaticPath  :  String = "credits";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
  Inspect     :  Number;

  Credits: Object = {};

  constructor(private layoutService: LayoutService, private creditsService: CreditsService, private router: Router) {
    this.layoutService.PrivilegesForComponent(this.StaticPath).subscribe((result) => {
        this.View      = result[0].view;
        this.Enter     = result[0].enter;
        this.Actualize = result[0].actualize;
        this.Remove    = result[0].remove;
        this.Inspect   = result[0].inspect;
    
        this.LoadList();
    });
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
    if(this.Inspect==1){
      this.creditsService.getAllCreditsForInspect().subscribe((result) => {
        this.Credits = result;
      });
    }else{
      this.creditsService.getAllCredits().subscribe((result) => {
        this.Credits = result;
      });
    }
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.creditsService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

}
