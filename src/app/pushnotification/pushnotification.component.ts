import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import {PushnotificationService} from './pushnotification.service';

@Component({
 // moduleId: module.id,
  selector: 'app-pushnotification',
  templateUrl: './pushnotification.component.html',
  styleUrls: ['./pushnotification.component.scss']
})
export class PushnotificationComponent implements OnInit {

  private title: string = 'Browser Push Notifications!';
    constructor(private _notificationService: PushnotificationService) {
       // this.PushnotificationService.requestPermission();
    }
    ngOnInit() {}
    notify() {
        let data: Array < any >= [];
        data.push({
            'title': 'Approval',
            'alertContent': 'This is First Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Request',
            'alertContent': 'This is Second Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Leave Application',
            'alertContent': 'This is Third Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Approval',
            'alertContent': 'This is Fourth Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'To Do Task',
            'alertContent': 'This is Fifth Alert -- By Debasis Saha'
        });
       // this._notificationService.generateNotification(data);
    }

}
