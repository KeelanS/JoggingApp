import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { SidebarComponent} from './components/sidebar/sidebar.component';
import { ContentComponent } from './components/content/content.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './components/list/list.component';
import { AddModalComponent } from './modals/add-modal/add-modal.component';
import { HttpClientModule } from "@angular/common/http";
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddDeelnemerModalComponent } from './modals/add-deelnemer-modal/add-deelnemer-modal.component';
import { InvullenModalComponent } from './modals/invullen-modal/invullen-modal.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatButtonToggleModule, MatFormFieldModule, MatInputModule} from "@angular/material";
import { RunnerSorter } from './runnerSorter';
import {AutofocusDirective} from "./directives/autofocus.directive";
import { PrintLayoutComponent } from './components/print-layout/print-layout.component';
import { UitslagComponent } from './components/uitslag/uitslag.component';

@NgModule({
  declarations: [
    RunnerSorter,
    AppComponent,
    SidebarComponent,
    ContentComponent,
    HeaderComponent,
    ListComponent,
    AddModalComponent,
    PageNotFoundComponent,
    AddDeelnemerModalComponent,
    InvullenModalComponent,
    AutofocusDirective,
    PrintLayoutComponent,
    UitslagComponent
  ],
  imports: [
    BrowserModule,
    AlertModule.forRoot(),
    AngularFontAwesomeModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    DragDropModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonToggleModule,
  ],
  entryComponents: [AddModalComponent, AddDeelnemerModalComponent, InvullenModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
