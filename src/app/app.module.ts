import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavigationComponent } from './navigation/navigation.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrackerModule } from './tracker/tracker.module';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UnitTypeModule } from './unittype/unit-type.module';
import { RouterModule } from '@angular/router';
import { TrackerRecordModule } from './tracker-record/tracker-record.module';
import '@angular/common/locales/global/nl-BE';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        NavigationComponent,
        NotFoundPageComponent,
        HomeComponent
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
        TrackerRecordModule,
        UserModule,
        AuthModule,
        SidebarModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'nl-BE' },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
