import { DataopsService } from './dataops/dataops.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }    from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { AppComponent } from './app.component';
import { DataopsComponent } from './dataops/dataops.component';
import { OperationComponent } from './operation/operation.component';
import { HeaderComponent } from './header/header.component';
import {TableModule} from 'primeng/table';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; 
import {MatButtonModule} from '@angular/material/button';
//import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { HttpModule } from '@angular/http';
//import { BarChartComponent } from './bar-chart/bar-chart.component'; 
import { ChartsModule } from 'ng2-charts';
import { DatePipe } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { DatepipePipe } from './datepipe.pipe';
import { ChartComponent } from './chart/chart.component';
import { PushnotificationComponent } from './pushnotification/pushnotification.component';
import { FileuploadComponent } from './fileupload/fileupload.component';

const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'left',
			distance: 12
		},
		vertical: {
			position: 'bottom',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};
@NgModule({
  declarations: [
    AppComponent,
    DataopsComponent,
    OperationComponent,
    HeaderComponent,
    BarChartComponent,
    DatepipePipe,
    ChartComponent,
    PushnotificationComponent,
    FileuploadComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
     MatSidenavModule,
     MatIconModule,
    ReactiveFormsModule,
    DataTablesModule,
    TableModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
     HttpModule,
    ChartsModule
    ,NotifierModule.withConfig(customNotifierOptions)
   // MatSidenavModule
  ],
  // exports:[MatSidenavModule],
  providers: [DatePipe,DataopsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
