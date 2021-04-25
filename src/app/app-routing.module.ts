import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { BudgetRecordCategoryOverviewComponent } from './budget-tracker/budget-record-category/budget-record-category-overview/budget-record-category-overview.component';
import { BudgetTrackerDetailComponent } from './budget-tracker/budget-tracker-detail/budget-tracker-detail.component';
import { BudgetTrackerOverviewComponent } from './budget-tracker/budget-tracker-overview/budget-tracker-overview.component';
import { HomeComponent } from './main/home/home.component';
import { NotFoundPageComponent } from './main/not-found-page/not-found-page.component';
import { TrackerDetailComponent } from './tracker/tracker-detail/tracker-detail.component';
import { TrackerOverviewComponent } from './tracker/tracker-overview/tracker-overview.component';
import { UnitTypeOverviewComponent } from './unittype/unit-type-overview/unit-type-overview.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';


export class RoutingData {
  name: string;
  url: string;
}

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        data: { breadCrumb: 'Home' }
    },
    {
        path: 'trackers',
        data: { breadCrumb: 'Trackers' },
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'detail/:id',
                component: TrackerDetailComponent,
                data: { breadCrumb: 'Detail' },
            },
            {
                path: 'overview',
                component: TrackerOverviewComponent,
                data: { breadCrumb: 'Overview' },
            }
        ]
    },
    {
        canActivate: [ AuthGuard ],
        path: 'unittypes',
        data: { breadCrumb: 'Unittypes' },
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                component: UnitTypeOverviewComponent,
                data: { breadCrumb: 'Overview' }
            }
        ]
    },
    {
        path: 'user',
        data: { breadCrumb: 'User' },
        children: [
            {
                path: '',
                redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'login',
                component: LoginComponent,
                data: { breadCrumb: 'Login' },

            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [ AuthGuard ],
                data: { breadCrumb: 'Profile' },
            },
            { path: '**', redirectTo: 'login', pathMatch: 'full'}
        ]
    },
    {
        path: 'budget-trackers',
        data: { breadCrumb: 'Budget Trackers' },
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'detail/:id',
                component: BudgetTrackerDetailComponent,
                data: { breadCrumb: 'Detail' },
            },
            {
                path: 'overview',
                component: BudgetTrackerOverviewComponent,
                data: { breadCrumb: 'Overview' },
            }
        ]
    },
    {
        canActivate: [ AuthGuard ],
        path: 'budgetcategories',
        data: { breadCrumb: 'Budget Record Categories' },
        children: [
            {
                path: '',
                redirectTo: 'overview',
                pathMatch: 'full'
            },
            {
                path: 'overview',
                component: BudgetRecordCategoryOverviewComponent,
                data: { breadCrumb: 'Overview' }
            }
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
