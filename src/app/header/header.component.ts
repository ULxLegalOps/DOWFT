import { Component} from '@angular/core';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl:'./header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {
  opennav:boolean=false;
  constructor() { }

  // ngOnInit(): void {
  // }
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
