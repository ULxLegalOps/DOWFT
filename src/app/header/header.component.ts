import { Component,Input} from '@angular/core';
declare var jquery: any;
declare var $: any;
import {DataopsService} from '../dataops/dataops.service';
@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
 // initialCount: number = 10;
  opennav:boolean=false;
 badgeCount:any;
 public isPopupShow: boolean = false;
  constructor(private dataopsService:DataopsService) { 
  //  this.badgeCount = 0;
  }
  // incrementCount() {
  //   //this.badgeCount++;
  //   this.badgeCount = this.dataopsService.UpdateData;
  //   console.log("badge count header"+ this.badgeCount);
  // }

  // clearCount() {
  //   this.badgeCount = 0;
  // }  

   ngOnInit(): void {
    this.badgeCount = this.getBadgeData();
     console.log("badge count header" + this.badgeCount);
   }
   getBadgeData() {
    // this.isPopupShow = true;
    // setTimeout(()=>{   
    //    this.isPopupShow = false;
    // }, 3000);
    return JSON.parse(localStorage.getItem('number'));
  }
  clearCount() {
    //this.countNumber = 0;
    localStorage.clear();
  }  
  OpenNav(){
//     $( document ).ready(function() {
//       $('.leftmenutrigger').on('click', function(e) {
//       $('.side-nav').toggleClass("open");
//       e.preventDefault();
//      });
//  });
 //alert();
 this.opennav = !this.opennav;
  }

}
