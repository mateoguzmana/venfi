import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ViabilitiesService } from '../viabilities.service';
import { LayoutService } from '../../layout/layout.service';
declare var jQuery: any;

@Component({
  selector: '[list-viabilities]',
  templateUrl: './list-viabilities.template.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./list-viabilities.style.scss']
})
export class ListViabilitiesComponent {
  
  StaticPath  :  String = "viabilities";
  View        :  Number;
  Enter       :  Number;
  Actualize   :  Number;
  Remove      :  Number;
  Inspect     :  Number;

  Viabilities: Object = {};

  constructor(private layoutService: LayoutService, private viabilitiesService: ViabilitiesService, private router: Router) {
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
      this.viabilitiesService.getAllViabilities2().subscribe((result) => {
        this.Viabilities = result;
      });
    }else{
      this.viabilitiesService.getAllViabilities().subscribe((result) => {
        this.Viabilities = result;
      });
    }
  }

  changeState(id, state){
    if(state==1){
      state=0
    }else{
      state=1
    }

    this.viabilitiesService.changeState(id, state).subscribe((result) => {
      if(result==1){
        this.LoadList();
      }
    });
    
  }

  sendTime(date){
    var msecPerMinute = 1000 * 60;
    var msecPerHour = msecPerMinute * 60;
    var msecPerDay = msecPerHour * 24;

    let Hour = new Date().getHours();
    let Mins = new Date().getMinutes();

    let TotalHour = Hour+":"+Mins;

    let houractually = new Date().toISOString().slice(0,10)+" "+TotalHour;

    let hour1 = new Date(houractually).getTime();
    let hour2 = new Date(date).getTime();

    var dif = hour1 - hour2;

    var hoursdiff = dif / msecPerHour;
    var hourstotal = Math.round(hoursdiff);

    return (hourstotal);  
  }

}
