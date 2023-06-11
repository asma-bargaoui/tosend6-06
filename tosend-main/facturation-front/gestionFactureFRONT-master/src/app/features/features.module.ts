import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { ManageConventionComponent } from './manage-convention/manage-convention.component';
import { ManageCalendrierComponent } from './manage-calendrier/manage-calendrier.component';
import { ManageStructureComponent } from './manage-structure/manage-structure.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageFactureComponent } from './manage-facture/manage-facture.component';
import { SharedModule } from '../shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from '../auth/interceptors/interceptor.interceptor';
import { GraphesComponent } from '../graphes/graphes.component';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';






@NgModule({
  declarations: [
    HomeComponent, 
    LandingPageComponent,
    ManageApplicationComponent,
    ManageConventionComponent,
    ManageCalendrierComponent,
    ManageFactureComponent, 
    ManageStructureComponent,
    ManageUsersComponent,
    GraphesComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    SharedModule,
    MatStepperModule,
    NgxDatatableModule,
    FormsModule,
    NgxPaginationModule ,
    MatPaginatorModule,
    MatTableModule,
    FormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true
    }
  ]
})
export class FeaturesModule { }
