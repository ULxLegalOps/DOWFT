import { Component,Input} from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
declare var jquery: any;
declare var $: any;
import {DataopsService} from '../dataops/dataops.service';
import {config} from '../config';

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
  cookieData: any;
  countNumber: any;
  public isShow:boolean = false;
  constructor(private dataopsService:DataopsService,private http: HttpClient) { 
  }
   ngOnInit(): void {
    this.http.get<any>(config.HTTPS_PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('Logs')/Items?&$top=100&$orderby= Id desc").subscribe(data => {
      this.cookieData = data.value;
     this.countNumber= this.cookieData.length;
      console.log(this.cookieData.length);
    });
   }
   getBadgeData() {
    return JSON.parse(localStorage.getItem('number'));
  }
  clearCount() {
    //this.countNumber = 0;
    localStorage.clear();
  }  
  OpenNav(){
    this.opennav = !this.opennav;
     }
 dismis(item){
   this.dataopsService.DeleteData(item.Id).then((resp) =>{
   });
 }
 show(){
  this.isShow = !this.isShow;
}

}
