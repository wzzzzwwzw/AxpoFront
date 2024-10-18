import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; // Import your routing module
import { AppComponent } from './app.component';
import { OverviewComponent } from './components/overview/overview.component';
import { DrillDownComponent } from './components/drill-down/drill-down.component';
import { MatCardModule } from '@angular/material/card';
import {FlexModule} from "@angular/flex-layout"; // Import Angular Material card module

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    DrillDownComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule, // Include AppRoutingModule here
    MatCardModule,
    FlexModule,
    // Include Angular Material module
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
