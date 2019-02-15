import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AlertModule } from "ngx-bootstrap";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { SidebarComponent} from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './list/list.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { HttpClientModule } from "@angular/common/http";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddDeelnemerModalComponent } from './add-deelnemer-modal/add-deelnemer-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContentComponent,
    HeaderComponent,
    ListComponent,
    AddModalComponent,
    PageNotFoundComponent,
    AddDeelnemerModalComponent,
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
  ],
  entryComponents: [AddModalComponent, AddDeelnemerModalComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
