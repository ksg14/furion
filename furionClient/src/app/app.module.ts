import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from './material/material.module';
import { UserService } from './user.service';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { environment } from '../environments/environment'
import { GameInfoService } from './game-info.service';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp (environment.firebase),
    NgxChartsModule,
    NgbModule
  ],
  providers: [
    UserService,
    AuthGuard,
    GameInfoService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
