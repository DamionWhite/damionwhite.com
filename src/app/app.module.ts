import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangeLogComponent } from './changelog/changelog.component';
import { FormsModule } from '@angular/forms';
import { AddLogComponent } from './changelog/add-log/add-log.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeLogComponent,
    AddLogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
