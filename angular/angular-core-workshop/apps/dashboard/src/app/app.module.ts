import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@workshop/material'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiLoginModule } from '@workshop/ui-login';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    UiLoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
