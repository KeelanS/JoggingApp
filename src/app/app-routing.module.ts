import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./list/list.component";
import { ContentComponent } from "./content/content.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo:'/content', pathMatch: 'full' },
  { path: 'content', component: ContentComponent},
  { path: 'list/:raceId', component: ListComponent},
  { path: 'not-found', component: PageNotFoundComponent},
  { path: '**', component: PageNotFoundComponent},
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }