import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from "app/core/security/auth.guard";
import { LoginComponent } from "app/login/login.component";

const routes: Routes = [
   //{ path: '', pathMatch: 'full', redirectTo: 'dash', },
  { path: 'dash', component: DashboardComponent, canActivate:[AuthGuard]}, // , canActivate:[AuthGuard]
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //, { useHash: true }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
