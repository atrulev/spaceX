import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShipsComponent } from './ships/ships.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {SpacexDataServiceService} from './spacex-data-service.service';
@NgModule({
  declarations: [
    AppComponent,
    ShipsComponent,
    ShipDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [SpacexDataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
