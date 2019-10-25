import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LocationsService } from './locations.service';
import { PlaceComponent } from './place/place.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LocationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
