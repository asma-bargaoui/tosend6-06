import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageFactureComponent } from './manage-facture/manage-facture.component';
import { ManageConventionComponent } from './manage-convention/manage-convention.component';
import { ManageStructureComponent } from './manage-structure/manage-structure.component';
import { ManageApplicationComponent } from './manage-application/manage-application.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from '../auth/login/login.component';
import { GraphesComponent } from '../graphes/graphes.component';

const routes: Routes = [
  
  {
    path: "manageUsers", 
    component: ManageUsersComponent
  },
  {
    path: "manageFacture",
    component: ManageFactureComponent
  },
  {
    path: "manageConvention",
    component: ManageConventionComponent
  },
  {
    path: "manageStructure",
    component: ManageStructureComponent
  },
  {
    path: "manageApplication",
    component: ManageApplicationComponent
  },
  
  {
    path: "login",
    component: LoginComponent
  },
 
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "Graphes",
    component: GraphesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
