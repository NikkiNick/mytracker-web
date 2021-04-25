import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/root/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NotFoundPageComponent } from './main/not-found-page/not-found-page.component';
import { HomeComponent } from './main/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrackerModule } from './tracker/tracker.module';
import { FormsModule } from '@angular/forms';
import { UnitTypeModule } from './unittype/unit-type.module';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { TrackerRecordModule } from './tracker-record/tracker-record.module';
import '@angular/common/locales/global/nl-BE';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavModule } from './nav/nav.module';
import { SharedModule } from './shared/shared.module';
import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { BudgetTrackerModule } from './budget-tracker/budget-tracker.module';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { BudgetRecordCategoryModule } from './budget-tracker/budget-record-category/budget-record-category.module';

@NgModule({
    declarations: [
        AppComponent,
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
        SharedModule,
        TrackerModule,
        UnitTypeModule,
        TrackerRecordModule,
        UserModule,
        AuthModule,
        NavModule,
        BudgetTrackerModule,
        MatNativeDateModule, 
        BudgetRecordCategoryModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'nl-BE' },
        { provide: MAT_DATE_LOCALE, useValue: 'nl-BE'},
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
