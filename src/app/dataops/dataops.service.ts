import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';   
import {config} from '../config';
declare let $: any;
@Injectable({
  providedIn: 'root'
})
export class DataopsService {
  SharePointUrl:any;
  myError:string;
  
  constructor(private http:  HttpClient) {
   }
  getDataResp(){
   return this.http.get<any>(config.PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items?&$top=100&$orderby= Id desc")
  }
  DeleteData(NID:any){
     const headers = new HttpHeaders({
      "If-Match":"*",
      "X-HTTP-Method": "DELETE",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      });   
    return this.http.post(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('Logs')/Items("+NID+")",{headers}).toPromise().then(resp => {
      return Promise.resolve(resp);
    })
    .catch(err => Promise.reject(
         console.log(JSON.stringify(err))),
    );
  }
  UpdateData(Status:string,Comments:string, Id:any,DataOpsMemberId:string){
   // var digest = document.getElementById("__REQUESTDIGEST") as HTMLInputElement;
   // headers.set('X-RequestDigest',digest.value);
    const headers = new HttpHeaders({
    "If-Match":"*",
    "X-Http-Method" : "MERGE",
    "X-RequestDigest": $("#__REQUESTDIGEST").val(),
    });   
    var body = {   
     Status: Status,
     Comments:Comments,
     DataOpsMemberId:DataOpsMemberId
   }
return this.http.post(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/Items("+Id+")" ,body, { headers })
.toPromise().then(resp => {
  return Promise.resolve(resp);
})
.catch(err => Promise.reject(
     console.log(JSON.stringify(err))),
);

}
PushNotification(Title:string){
  var body = {   
    Title:Title,
  }
  return this.http.post(config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('Logs')/Items" ,body).toPromise().then(resp => {
    return Promise.resolve(resp);
  })
  .catch(err => Promise.reject(
       console.log(JSON.stringify(err))),
     // console.log(err),
      // err.status= err.status === 404 ? "error occured" : "error did not occured",
  );

}
}
