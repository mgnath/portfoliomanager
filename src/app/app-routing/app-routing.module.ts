import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
   //{ path: '', pathMatch: 'full', redirectTo: 'dash', },
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //, { useHash: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
