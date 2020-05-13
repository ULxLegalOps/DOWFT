import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from "@angular/forms";
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {config} from '../config';
import { stringify } from 'querystring';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html',
  styleUrls: ['./operation.component.scss']
})
export class OperationComponent implements OnInit {
  form_post: FormGroup;
  title:any;
  data:any;
  submitted = false;
  constructor(private fb: FormBuilder,private http:HttpClient,private router: Router) {
    this.form_post = this.fb.group({
      Title:['',Validators.required],
      Description: ['',Validators.required],
      Priority:['',Validators.required],
      Category:['',Validators.required],
      SubCategory:['',Validators.required],
      Status:['',Validators.required],
      DateResolved:['',Validators.required],
      Comments:['',Validators.required]
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
  get f() { return this.form_post.controls; }
  submitForm(value: FormGroup) {
    this.submitted = true;
    if (this.form_post.invalid) {
        return;
    }
    const SharepointURL : string = config.HTTPS_PLUGIN_URL +"/ContractRoomDataOps/_api/web/lists/getByTitle('IssueLogs')/items";
     const headers = new HttpHeaders({
      "If-Match":"*",
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      });   
    const payload = {
      Title : this.form_post.get('Title').value,
      Description : this.form_post.get('Description').value,
      Priority:this.form_post.get('Priority').value,
      Category:this.form_post.get('Category').value,
      SubCategory:this.form_post.get('SubCategory').value,
      Status:this.form_post.get('Status').value,
      DateResolved:this.form_post.get('DateResolved').value,
      Comments:this.form_post.get('Comments').value
    };
    console.log("payload" + JSON.stringify(payload));
    return this.http.post(SharepointURL, payload,{headers}).toPromise().then(resp => {
     this.router.navigate(['issuelist']);
      return Promise.resolve(resp);
  }).catch(err => Promise.reject(err));
}

}
