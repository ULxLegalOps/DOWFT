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
//import {MatIconModule} from '@angular/material/icon';
// import {
//   MatSidenavModule,
//   MatSidenavContent,
//   MatSidenav
// } from '';
//import {MatSidenavModule} from 'angular-material';
//import { SPService } from './sp.service';

@NgModule({
  declarations: [
    AppComponent,
    DataopsComponent,
    OperationComponent,
    HeaderComponent,
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
   // MatSidenavModule

  ],
  // exports:[MatSidenavModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
