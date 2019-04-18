import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ListComponent } from "./components/list/list.component";
import { ContentComponent } from "./components/content/content.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo:'/content', pathMatch: 'full' },
  { path: 'content', component: ContentComponent},
  { path: 'list/:raceId', component: ListComponent},
  { path: 'not-found', component: ContentComponent},
  { path: '**', component: ContentComponent},
];



@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
