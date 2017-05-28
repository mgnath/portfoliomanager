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
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
import { AuthGuard } from "app/core/security/auth.guard";
import { LoginComponent } from './login/login.component';

export const firebaseConfig = {
    apiKey: "AIzaSyDsTymfb1C7ap2OrSciTv7aooLNgZU1j9U",
    authDomain: "portfoliomanager-9d2c9.firebaseapp.com",
    databaseURL: "https://portfoliomanager-9d2c9.firebaseio.com",
    projectId: "portfoliomanager-9d2c9",
    storageBucket: "portfoliomanager-9d2c9.appspot.com",
    messagingSenderId: "419411609008"
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavComponent,
    WatchlistComponent,
    TickerpriceComponent,
    UserCardComponent,
    LoginComponent
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
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [FinanceService, UtilService, ApiService, ConfigService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
