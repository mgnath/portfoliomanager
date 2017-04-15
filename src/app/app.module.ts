import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdCheckboxModule,
  MdInputModule,
  MdListModule,
  MdSelectModule,
  MdToolbarModule,
  MdGridListModule,
  MdCardModule,
  MdIconModule
} from '@angular/material';

import 'hammerjs';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FinanceService } from './core/services/finance.service';
import { UtilService } from './core/services/util.service';
import { DashboardComponent } from './dashboard/dashboard.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdListModule,
    MdSelectModule,
    MdCardModule,
    MdToolbarModule,
    MdGridListModule,
    MdListModule,
    MdIconModule,
    AppRoutingModule
  ],
  providers: [FinanceService,UtilService],
  bootstrap: [AppComponent]
})
export class AppModule { }
