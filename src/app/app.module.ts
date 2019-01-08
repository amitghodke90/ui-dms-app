import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FileSelectDirective} from 'ng2-file-upload';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { InviteMemberComponent } from './components/invite-member/invite-member.component';
import { UploadDocumentComponent } from './components/upload-document/upload-document.component';
import { SearchDocumentComponent } from './components/search-document/search-document.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FileSelectDirective,
    HeaderComponent,
    CreateTeamComponent,
    InviteMemberComponent,
    UploadDocumentComponent,
    SearchDocumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AngularFontAwesomeModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
