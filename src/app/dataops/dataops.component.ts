import { Component, OnInit, ViewChild,ElementRef,Input} from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import {config} from '../config';
import {DataopsService} from '../dataops/dataops.service';
//import * as XLSX from 'xlsx';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
declare let $: any;
@Component({
  selector: 'app-dataops',
  templateUrl:'./dataops.component.html',
  styleUrls: ['./dataops.component.scss']
})
export class DataopsComponent implements OnInit {
  dateArr:any;
 // users:any;
//  public barChartOptions: ChartOptions = {
//   responsive: true,
// };
public barChartOptions: ChartOptions = {
  //scaleShowVerticalLines: false,
  responsive: true,
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100
        }
      }
    ]
  }
};
public barChartLabels: string[] = [];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
  form_post: FormGroup;
  users: User[];
  cols: any[];
  title = 'Excel';  
  pendingallocations:any[];
  getdata:any;
  getAttachment:[];
  item: any;
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
  getDate:any[]=[];
  getStatus:any[]=[];
  daterange:any;
  assignedperday:any;
  pendingperday:any;
  completedperday:any;
  inprogressperday:any;
  receivedperday:any;
  getsingleday:any;
  newArray:any[]=[];
  public barChartData: any[] = [
    { data: [], label: 'Received' },
    { data: [], label: 'Assigned' },
    { data: [], label: 'Pending' },
    { data: [], label: 'Completed' },
    { data: [], label: 'InProgress' },

  ];
  constructor(private fb: FormBuilder,private http: HttpClient,private dataopsService:DataopsService) {}
 
  ngOnInit(): void {
    this.http.get<any>(config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items?&$top=100&$orderby= Id desc").subscribe(data => {
     this.users = data.value;
     this.Assigned =0;
     this.Pending=0;
     this.Completed=0;
     this.InProgress=0;
     this.Received=0;
    // this.item = 0;
    this.assignedperday =0;
    this.completedperday =0;
   this.pendingperday=0;
     this.inprogressperday=0;
     this.receivedperday=0;
    
     for(let user of this.users){
       if(user.DateTime !== null){
        let newDate = user.DateTime.slice(0,10);
        this.getDate.push(newDate);
       // console.log("get date length " + this.getDate);
      }
       if(user.Status !== null){
        this.getStatus.push(user.Status);
      //  console.log("user statys" + this.getStatus );
       }
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
     var timeFrom = (X) => {
      var dates = [];
      for (let I = 0; I < Math.abs(X); I++) {
        dates.push(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'}));
      }
      return dates;
     // console.log(dates);
  }
  this.dateArr = timeFrom(10); 
   for(let I = 0; I < this.dateArr.length; I++ ) {
     for(let j=0; j<this.getDate.length; j++){
     // console.log(this.dateArr[I]);
     // console.log(this.getDate[j]);
     if(this.dateArr[I] === this.getDate[j]){
       for(let i =0; i<= this.getStatus.length; i++){
         console.log(this.getStatus[i]);
         if(this.getStatus[i] == 'Received'){
           this.receivedperday++;
           console.log(this.receivedperday);
         }
         if(this.getStatus[i] == 'Assigned'){
           this.assignedperday++
         }
         if(this.getStatus[i] == 'Pending'){
           this.pendingperday++;
         }
         if(this.getStatus[i] == 'Completed'){
           this.completedperday++;
         }
         if(this.getStatus[i]== 'In Progress'){
           this.inprogressperday++
         }   
        };
       // this.barChartLabels.forEach(label => {
          this.barChartData[0].data.push(this.receivedperday);
          this.barChartData[1].data.push(this.assignedperday);
          this.barChartData[2].data.push(this.pendingperday);
          this.barChartData[3].data.push(this.completedperday);
          this.barChartData[4].data.push(this.inprogressperday);
        // console.log("bar chart data"+ this.barChartData);
     //  });     
     }
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
 console.log("new list item"+ JSON.stringify(this.newList));
 this.Id = JSON.parse(this.newList[0].Id);
 this.Title = JSON.stringify(this.newList[1].title);
 this.From = JSON.stringify(this.newList[2].From);
 this.DateTime = JSON.stringify(this.newList[3].DateTime);
 this.Status = JSON.stringify(this.newList[4].Status);
 this.DataOpsMemberId = JSON.stringify(this.newList[5].DataOpsMemberId);
 this.EmailBody = JSON.stringify(this.newList[6].EmailBody);
 this.Comments = JSON.stringify(this.newList[7].Comments);


  this.http.get<any>(config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items(" + this.Id + ")/AttachmentFiles ").subscribe(data => {
    this.getAttachment = data.value;
   // console.log("get data from mail with attachment" + JSON.stringify(this.getAttachment) );
   // alert(JSON.stringify(this.getAttachment));
  });

  }
  submitForm(EditForm: NgForm) {
    this.Id  = this.Id;
    this.Status = this.Status;
   this.Comments= this.Comments;
   this.DataOpsMemberId= this.DataOpsMemberId ;
  // console.log("id value" + this.Id);
   this.dataopsService.UpdateData(this.Status,this.Comments,this.Id,this.DataOpsMemberId).then((resp) =>{
   
   });
  // console.log("parameters" + this.Status,this.Comments, this.DataOpsMemberId);
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

