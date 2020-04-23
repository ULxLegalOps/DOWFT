import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {config} from '../config';
import { stringify } from 'querystring';
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  form_post: FormGroup;
  title:any;
  data:any;
  constructor(private fb: FormBuilder,private http:HttpClient) {
    this.form_post = this.fb.group({
      Id:[''],
      Comments: [''],
      Status:[''],
      DataOpsMemberId:[''],
    })
   }
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  ngOnInit(): void {
     this.data = [
      {id: 5, name: '04/15/2020'},
      {id: 5, name: '04/15/2020'},
      {id: 5, name: '05/15/2020'},
      {id: 5, name: '06/15/2020'},
      {id: 5, name: '05/15/2020'},
      {id: 5, name: '06/15/2020'},
    ];
  }
//   submitForm(value: FormGroup) {
//     const SharepointURL : string = config.PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('DataOps')/items";
//     const payload = {
//       Id : '1284',
//       Comments : this.form_post.get('Comments').value,
//       Status:this.form_post.get('Status').value,
//       DataOpsMemberId:this.form_post.get('DataOpsMemberId').value
//     };
//     console.log("payload" + JSON.stringify(payload));
//     return this.http.put(SharepointURL, payload, this.httpOptions).toPromise().then(resp => {
//       alert("success");
//       return Promise.resolve(resp);
//   }).catch(err => Promise.reject(err));
// }

}
