import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http'
import { TrackerModule } from './tracker/tracker.module';
import { FormsModule } from '@angular/forms';
import { BreadCrumbsComponent } from './bread-crumbs/bread-crumbs.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UnitTypeModule } from './unittype/unit-type.module';
import { RouterModule } from '@angular/router';
import { TrackerRecordModule } from './tracker-record/tracker-record.module';
import '@angular/common/locales/global/nl-BE';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    NotFoundPageComponent,
    HomeComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule, 
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    TrackerModule,
    UnitTypeModule,
    TrackerRecordModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "nl-BE" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
