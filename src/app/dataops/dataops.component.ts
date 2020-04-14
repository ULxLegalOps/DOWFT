import { Component, OnInit, ViewChild,ElementRef,Input} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import {config} from '../config';
import {DataopsService} from '../dataops/dataops.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { NotifierService } from 'angular-notifier';
import { Label } from 'ng2-charts';
declare let $: any;
@Component({
  selector: 'app-dataops',
  templateUrl:'./dataops.component.html',
  styleUrls: ['./dataops.component.scss']
})
export class DataopsComponent implements OnInit {
  users: User[];
  cols: any[];
  title = 'Excel';  
  pendingallocations:any[];
  getdata:any;
  getAttachment:any[];
  newList:any[];
  Id:any;
  Title:any;
  From:any;
  DateTime:any;
  Status:any;
  DataOpsMemberId:any;
  EmailBody:any;
  Comments:any;
  SharePointUrl:string;
  jsonBody:any;
  Pending:any;
  Assigned:any;
  Completed:any;
  InProgress:any;
  Received:any;
  countNumber:number;
  opennav:boolean=false;
  public isPopupShow: boolean = false;
  newArray:any[]=[];
  attachmentUrl:any;
  test: string;
  constructor(private fb: FormBuilder,private http: HttpClient,private dataopsService:DataopsService,	private notifier: NotifierService) {
    this.countNumber=0;
    this.notifier = notifier;
  }
  ngOnInit(): void {
    this.dataopsService.getDataResp().subscribe(data => {
     this.users = data.value;
     this.Assigned =0;
     this.Pending=0;
     this.Completed=0;
     this.InProgress=0;
     this.Received=0;  
     for(let user of this.users){
       if (user.Status == 'Received') {
        this.Received ++;
       }
        if (user.Status == 'Assigned') {
         this.Assigned ++;
     
        }
        if (user.Status == 'Pending') {
          this.Pending ++;
         
         }
         if (user.Status == 'Completed') {
          this.Completed ++;
         }
         if (user.Status == 'In Progress') {
          this.InProgress ++;
         }
     }
  });
     this.cols = [
      { field: 'Id', header: '#' },
      { field: 'From', header: 'From' },
      { field: 'Title', header: 'Subject' },
      { field: 'Status', header: 'Status' },
      { field: 'DataOpsMemberId', header: 'Member' },
       { field: 'DateTime', header: 'DateTime' }
  ];
  }
  Copy(col){
    this.newList = [
      {'Id':col.Id},
      {'title':col.Title},
      {'From': col.From},
      {'DateTime': col.DateTime},
      {'Status': col.Status},
      {'DataOpsMemberId': col.DataOpsMemberId},
      {'EmailBody': col.EmailBody.replace(/<[^>]*>/g, '').replace(/#160;/g, '').replace(/&/g, '').replace(/#58;/g, '').replace(/[^a-zA-Z ]/g, "")},
      {'Comments':col.Comments}
    ]
 this.Id = JSON.parse(this.newList[0].Id);
 this.Title = JSON.stringify(this.newList[1].title);
 this.From = JSON.stringify(this.newList[2].From);
 this.DateTime = JSON.stringify(this.newList[3].DateTime);
 this.Status = JSON.stringify(this.newList[4].Status);
 this.DataOpsMemberId = JSON.stringify(this.newList[5].DataOpsMemberId);
 this.EmailBody = JSON.stringify(this.newList[6].EmailBody);
 this.Comments = JSON.stringify(this.newList[7].Comments);
this.attachmentUrl = config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items(" + this.Id + ")/AttachmentFiles";
 this.http.get<any>(this.attachmentUrl).subscribe(data => {
    this.getAttachment = data.value;
  });
  }
  clearCount() {
    this.countNumber = 0;
  }  
  OpenNav(){
     this.opennav = !this.opennav;
      }
  submitForm(EditForm: NgForm) {
    this.Id  = this.Id;
    this.Status = this.Status;
    this.Comments= this.Comments;
    this.DataOpsMemberId= this.DataOpsMemberId ;
    this.dataopsService.UpdateData(this.Status,this.Comments,this.Id,this.DataOpsMemberId).then((resp) =>{
    this.countNumber++;
    this.isPopupShow = true;
      setTimeout(()=>{   
         this.isPopupShow = false;
      }, 3000);
     localStorage.setItem('number', JSON.stringify(this.countNumber));
     this.test = localStorage.getItem('number');
     console.log("test value localstorate" + this.test);
   });
  }
}
export interface User {
  Id;
  From;
  Title;
  Status;
  DataOpsMemberId;
  DateTime;
}

