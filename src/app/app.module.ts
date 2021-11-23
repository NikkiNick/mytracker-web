import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './main/root/app.component';
import { NotFoundPageComponent } from './main/not-found-page/not-found-page.component';
import { HomeComponent } from './main/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TrackerModule } from './tracker/tracker.module';
import { UnitTypeModule } from './unittype/unit-type.module';
import { RouteReuseStrategy } from '@angular/router';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundPageComponent,
        HomeComponent
    ],
    imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
        SharedModule,
        AppRoutingModule,
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
