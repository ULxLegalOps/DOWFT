import { TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {config} from '../config';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
// import {DatepipePipe} from 'src/app/datepipe.pipe';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  dateArr:any[]=[];
  public formatedArray:any[]=[];
  public countArray:any[]=[];
  item: any[]=[];
  assignedperday:any;
  pendingperday:any;
  completedperday:any;
  inprogressperday:any;
  receivedperday:any;
  getsingleday:any;
  getDate:any[]=[];
  getStatus:any[]=[];
  daterange:any;
  startDate:any;
  endDate:any;
  test:any;
   users:any[]= [];
   newDateArray:any[]=[];
   newTime:any;
 firstdate:any;
 secondate:any;
 thirddate:any;
 fourthdat:any;
 fifthday:any;
 sixthday:any;
 seventhday:any;
 eighthday:any;
 ninthday:any;
 tenthday:any;
 count1:any;
 count2:any;
 count3:any;
 count4:any;
 count5:any;
 count6:any;
 count7:any;
 count8:any;
 count9:any;
 count10:any;
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
  { data: [], label: 'day' },

];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.assignedperday =0;
    this.completedperday =0;
     this.pendingperday=0;
     this.inprogressperday=0;
     this.receivedperday=0;
     this.count1 = 0;
     this.count2 = 0;
     this.count3 = 0;
     this.count4 = 0;
     this.count5 = 0;
     this.count6 = 0;
     this.count7 = 0;
     this.count8 = 0;
     this.count9 = 0;
     this.count10 = 0;
    this.startDate = new Date().toISOString().slice(0,10);
    this.endDate = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().slice(0,10);
    this.firstdate = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.secondate = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.thirddate = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.fourthdat = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.fifthday = new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.sixthday = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.seventhday = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.eighthday = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.ninthday = new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    this.tenthday = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'});
    console.log("yesterday" + this.tenthday);
    var timeFrom = (X) => {
          var dates = [];
          for (let I = 0; I < Math.abs(X); I++) {
            dates.push(new Date(new Date().getTime() - ((X >= 0 ? I : (I - I - I)) * 24 * 60 * 60 * 1000)).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric'}));
          }
          return dates;
         // console.log(dates);
      }
      this.dateArr = timeFrom(10); 
    this.http.get<any>(config.HTTPS_PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items?&$top=100&$orderby= Id desc&$(datetime('" + this.startDate + "') ge dateFrom) and (datetime('" + this.endDate + "') le dateTo").subscribe(data => {
      this.item = data.value;
      for(let date of this.item){
       this.formatedArray.push(date.DateTime.slice(0,10));
       this.formatedArray.splice(0, this.formatedArray.length, ...(new Set(this.formatedArray)))
        if(date.DateTime.slice(0,10) == this.firstdate){

         this.count1++;
        }
       
        if(date.DateTime.slice(0,10) == this.secondate){
         this.count2++;
        }
        

      if(date.DateTime.slice(0,10) == this.thirddate){
        this.count3++;
       
       }
       
       if(date.DateTime.slice(0,10) == this.fourthdat){
         this.count4++;
        
       }
       
       if(date.DateTime.slice(0,10) == this.fifthday){
         this.count5++;
        
       }
      
       if(date.DateTime.slice(0,10) == this.sixthday){
         this.count6++;
      
       }
      
       if(date.DateTime.slice(0,10) == this.seventhday){
         this.count7++;
        // alert('ok');
       
       }
      
       if(date.DateTime.slice(0,10) == this.eighthday){
        // alert('ok');
        this.count8++;
       
       }
      
       if(date.DateTime.slice(0,10) == this.ninthday){
        // alert('ok');
        this.count9++;
        
       }
       
       if(date.DateTime.slice(0,10) == this.tenthday){
        // alert('ok');
        this.count10++;
       
       }
      
      }
     // this.countArray.push(this.count1,this.count2,this.count3);
      console.log("counts array" + this.countArray);
    //  this.barChartData[0].data.push(this.count1);
      // this.barChartData[1].data.push(this.count2);
      this.barChartData[0].data.push(this.count1,this.count2,this.count3,this.count4,this.count5,this.count6,this.count7,this.count8,this.count9,this.count10);

      // this.barChartData[2].data.push(this.count3);
      // this.barChartData[3].data.push(this.count4);
      // this.barChartData[4].data.push(this.count5);
      // this.barChartData[5].data.push(this.count6);
      // this.barChartData[6].data.push(this.count7);
      // this.barChartData[7].data.push(this.count8);
      // this.barChartData[8].data.push(this.count9);
      // this.barChartData[9].data.push(this.count10);

      });
    }
//     GetDayCount = function(items){
//       this.test =0;
//       let data :  any;
//       for(let data of this.item){
//         if(data.DateTime.slice(0,10) == items.DateTime.slice(0,10))
//         {
//          this.test++;
//          console.log(this.test);
//       }  
//     } return this.test    
    
// }
}
        
