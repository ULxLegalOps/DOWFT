import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';  
//import { Http, Headers, Response, RequestOptions } from '@angular/http'; 
import {config} from '../config';
@Injectable({
  providedIn: 'root'
})
export class DataopsService {
  // jsonHeader = 'application/json; odata=verbose';
  // headers = new Headers({ 'Content-Type': this.jsonHeader, 'Accept': this.jsonHeader });
  // options = new RequestOptions({ headers: this.headers });
  SharePointUrl:any;

  constructor(private http:  HttpClient) { }

  UpdateData(Status:string,Comments:string, Id:any,DataOpsMemberId:string){
    
    const headers = new HttpHeaders({
    "If-Match":"*",
    "X-Http-Method" : "MERGE"
    });   
    var body = {   
     Status: Status,
     Comments:Comments,
     DataOpsMemberId:DataOpsMemberId
    
   }
//console.log("payload" + JSON.stringify(body));
return this.http.put(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items("+Id+")" ,body, { headers }).toPromise().then(resp => {
  alert("success");
  location.reload();
  return Promise.resolve(resp);
}).catch(err => Promise.reject(err));


  }
}
