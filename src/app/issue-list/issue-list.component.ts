import { Component, OnInit } from '@angular/core';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import {config} from '../config';
@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issueList:any[]=[];
  title:any;
  description:any;
  priority:any;
  Category:any;
  SubCategory:any;
  Status:any;
  dateresolved:any;
  comments:any;
  resp:any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(config.HTTPS_PLUGIN_URL+"/ContractRoomDataOps/_api/web/lists/getByTitle('IssueLogs')/items?").subscribe(data => {
      this.issueList = data.value;
      console.log("issue list" + JSON.stringify(this.issueList));
  });
}

}
