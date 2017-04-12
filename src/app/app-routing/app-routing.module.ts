import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'dash', },
  { path: 'dash', component: DashboardComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'dash  ' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
