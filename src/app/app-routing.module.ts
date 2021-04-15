import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './main/home/home.component';
import { NotFoundPageComponent } from './main/not-found-page/not-found-page.component';
import { TrackerDetailComponent } from './tracker/tracker-detail/tracker-detail.component';
import { TrackerOverviewComponent } from './tracker/tracker-overview/tracker-overview.component';
import { UnitTypeDetailComponent } from './unittype/unit-type-detail/unit-type-detail.component';
import { UnitTypeOverviewComponent } from './unittype/unit-type-overview/unit-type-overview.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';


export class RoutingData {
  name: string;
  url: string;
}

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'trackers',
        data: { breadcrumb: 'Trackers' },
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'detail/:id',
                component: TrackerDetailComponent
            },
            {
                path: 'overview',
                component: TrackerOverviewComponent,
                data: { breadcrumb: 'Overview' }
            }
        ]
    },
    {
        canActivate: [ AuthGuard ],
        path: 'unittypes',
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'detail/:id', component: UnitTypeDetailComponent },
            { path: 'overview', component: UnitTypeOverviewComponent }
        ]
    },
    {
        path: 'user',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
            { path: '**', redirectTo: 'login', pathMatch: 'full'}
        ]
    },
    {
        path: '**',
        component: NotFoundPageComponent,
        data: { breadcrumb: 'Not found' }
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
    exports: [ RouterModule ] })
export class AppRoutingModule { }
