import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataopsComponent } from './dataops/dataops.component';
import { OperationComponent } from './operation/operation.component';
import { IssueListComponent } from './issue-list/issue-list.component';
const routes: Routes = [
// {path:"", component:HeaderComponent, pathMatch:'full'},
{ path: "", component: DataopsComponent, pathMatch: 'full' },
{path: 'operation', component: OperationComponent, pathMatch: 'full' },
{path: 'issuelist', component: IssueListComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
