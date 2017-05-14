import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
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
  MdIconModule,
  MdAutocompleteModule
} from '@angular/material';

import 'hammerjs';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FinanceService } from './core/services/finance.service';
import { UtilService } from './core/services/util.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { ApiService } from "app/core/services/api.service";
import { ConfigService } from "app/core/services/config.service";
import { TickerpriceComponent } from './templates/tickerprice.component';
import { AuthService } from "app/core/services/auth.service";
import { UserCardComponent } from "app/templates/usercard.component";
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    WatchlistComponent,
    TickerpriceComponent,
    UserCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    JsonpModule,
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
    MdAutocompleteModule,
    AppRoutingModule
  ],
  providers: [FinanceService,UtilService,ApiService,ConfigService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
