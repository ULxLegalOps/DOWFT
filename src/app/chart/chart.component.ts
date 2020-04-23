import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {config} from '../config';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  dateArr:any[]=[];
  item: any[]=[];
  public formatedArray:any[]=[];
  assignedperday:any;
  pendingperday:any;
  completedperday:any;
  inprogressperday:any;
  receivedperday:any;
  getDate:any[]=[];
  getStatus:any[]=[];
  public barChartOptions: ChartOptions = {
   //scaleShowVerticalLines: false,
   responsive: true,
   scales: {
     yAxes: [
       {
         ticks: {
           beginAtZero: true,
           min: 0,
           max: 30
         }
       }
     ]
   }
 };
 public barChartLabels: string[] = [];
 public barChartType: ChartType = 'bar';
 public barChartLegend = true;
 public barChartPlugins = [];
 public barChartData:any= [
  { data: [], label: 'Received' },
  { data: [], label: 'Assigned' },
  { data: [], label: 'Pending' },
  { data: [], label: 'In Progress' },
  { data: [], label: 'Completed' },

];
  startDate: string;
  endDate: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.assignedperday =0;
this.completedperday =0;
 this.pendingperday=0;
 this.inprogressperday=0;
 this.receivedperday=0;
this.startDate = new Date().toISOString().slice(0,10);
this.endDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
this.http.get<any>(config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items?&$top=2000&$orderby= Id desc&$(datetime('" + this.startDate + "') ge dateFrom) and (datetime('" + this.endDate + "') le dateTo").subscribe(data => {
  this.item = data.value;
  for(let date of this.item){
  if(date.DateTime !== null){
    this.formatedArray.push(date.DateTime.slice(0,10));
       this.formatedArray.splice(0, this.formatedArray.length, ...(new Set(this.formatedArray)))
   // [...new Set(this.getDate)];
  }
   if(date.Status !== null){
    this.getStatus.push(date.Status);
  //  [...new Set(this.getStatus)];
  //  console.log("user statys" + this.getStatus );
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
  }
  for(let I = 0; I < this.dateArr.length; I++ ) {
    for(let j=0; j<this.getDate.length; j++){
    // console.log(this.dateArr[I]);
    // console.log(this.getDate[j]);
  //  this.dateArr[I] = 0;
    if(this.dateArr[I] ==this.getDate[j]){
      let count = this.item.length;
     // console.log(count);
     // this.dateArr[I]++
     // console.log(this.dateArr[I]);
      for(let i =0; i<= this.getStatus.length; i++){
       // console.log(this.getStatus[i]);
        if(this.getStatus[i] == 'Received'){
          this.receivedperday++;
          console.log("test"+ this.receivedperday);
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
        this.resetCount();
       // console.log("bar chart data"+ this.barChartData);
    //  });     
    }
    }
   

   }
});
}
public resetCount(){
  this.assignedperday =0;
  this.completedperday =0;
   this.pendingperday=0;
   this.inprogressperday=0;
   this.receivedperday=0;
}

}
