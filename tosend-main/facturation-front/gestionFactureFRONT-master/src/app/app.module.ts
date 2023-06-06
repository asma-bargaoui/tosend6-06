import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import '@angular/compiler';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';

import { InterceptorInterceptor } from './auth/interceptors/interceptor.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { MatStepperModule } from '@angular/material/stepper';
import { FeaturesModule } from './features/features.module';
//import {CdkTableModule} from '@angular/cdk/table';
import { NgxPaginationModule } from 'ngx-pagination';
//import { Chart } from 'chart.js';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
   
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatStepperModule,
    SharedModule,
    FeaturesModule,
    NgxPaginationModule,
   // Chart,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
