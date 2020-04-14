import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';   
import {config} from '../config';
@Injectable({
  providedIn: 'root'
})
export class DataopsService {
  SharePointUrl:any;
  
  constructor(private http:  HttpClient) {
   
   }
  getDataResp(){
   return this.http.get<any>(config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items?&$top=100&$orderby= Id desc")
  }
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
return this.http.put(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items("+Id+")" ,body, { headers }).toPromise().then(resp => {
  return Promise.resolve(resp);
}).catch(err => Promise.reject(err));
}
}
