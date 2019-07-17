import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './components/list/list.component';
import { ContentComponent } from './components/content/content.component';
import {PrintLayoutComponent} from './components/print-layout/print-layout.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: ContentComponent },
  { path: 'list/:raceId', component: ListComponent},
  { path: 'print', component: PrintLayoutComponent},
  { path: 'not-found', component: ContentComponent},
  { path: '**', component: ContentComponent},
];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
