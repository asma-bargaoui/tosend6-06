import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MainComponent } from './main/main.component';
import { ManageFactureComponent } from './features/manage-facture/manage-facture.component';
import { GraphesComponent } from './graphes/graphes.component';
import { Chart } from 'chart.js';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule)
  },
  {
    path:"home",
    component: HomeComponent,
    loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
  },
  {
    path: "",
    component: HomeComponent,
    loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
  }
, 
{
  path: "graphes",
  component: GraphesComponent,
  loadChildren: ()=> import('./features/features.module').then(m=>m.FeaturesModule)
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
