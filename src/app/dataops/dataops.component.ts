import { Component, OnInit,  ElementRef, ViewChild} from '@angular/core';
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
  @ViewChild('fileUpload') fileUploadEl: ElementRef;
  fName = '';
  contents: any[];
  name = '';
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
  cookieData: any;
  public isShow:boolean = false;
  //Title:any;
  constructor(private fb: FormBuilder,private http: HttpClient,private dataopsService:DataopsService,	private notifier: NotifierService) {
   // this.countNumber=0;
   // this.notifier = notifier;
  }
  ngOnInit(): void {
    this.http.get<any>(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('Logs')/Items?&$top=100&$orderby= Id desc").subscribe(data => {
      this.cookieData = data.value;
     this.countNumber= this.cookieData.length;
      console.log(this.cookieData.length);
    });
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
  // this.dataopsService.getBellNotification().subscribe(data => {
  //   console.log(data);
  // });
  // this.dataopsService.getBellNotification().subscribe(data => {
  //     this.cookieData = data;
  //     console.log("notification data" +this.cookieData );
  //   });
     this.cols = [
      { field: 'Id', header: '#' },
      { field: 'From', header: 'From' },
      { field: 'Title', header: 'Subject' },
      { field: 'Status', header: 'Status' },
      { field: 'DataOpsMemberId', header: 'Member' },
       { field: 'DateTime', header: 'DateTime' }
  ];

    
   // console.log("notification data" +this.cookieData );
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
 
  show(){
    this.isShow = !this.isShow;
  // alert();
  }
  OpenNav(){
     this.opennav = !this.opennav;
      }
  submitForm(EditForm: NgForm) {
    let Title = "Status Has been Marked as " +this.Status;
    this.Id  = this.Id;
    this.Status = this.Status;
    this.Comments= this.Comments;
    this.DataOpsMemberId= this.DataOpsMemberId ;
    this.dataopsService.UpdateData(this.Status,this.Comments,this.Id,this.DataOpsMemberId).then((resp) =>{
      this.isPopupShow = true;
      setTimeout(()=>{   
         this.isPopupShow = false;
      }, 3000);
      this.dataopsService.PushNotification(Title).then((resp)=>{
        location.reload();

      })
      // if(resp.AuthorId == 10){
      //   console.log("failure");
      // }
    //  console.log(resp);
      //if(Status Code)
    // this.countNumber++;
   
    //  localStorage.setItem('number', JSON.stringify(this.countNumber));
    //  this.test = localStorage.getItem('number');
    //  console.log("test value localstorate" + this.test);
   });
  }
  public fileChanged(event?: UIEvent): void {
    const files: FileList = this.fileUploadEl.nativeElement.files;
    console.log(`files: `, files);

    const file = files[0];
    const reader = new FileReader();
    // reader.addEventListener('loadend', () => {
    //   console.log(arguments);
    //   console.log(reader);
    //   this.contents = reader.result;
    //   console.log(this.contents);
    // });
    // reader.readAsArrayBuffer(file);

    const loaded = (el) => {
      const contents = el.target.result;
      console.log('onloaded', contents);
      this.contents = contents;
    }
    reader.onload = loaded;
    reader.readAsText(file, 'UTF-8');
    this.name = file.name;
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

