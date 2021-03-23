import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { TrackerAddComponent } from './tracker/tracker-add/tracker-add.component';
import { TrackerDetailComponent } from './tracker/tracker-detail/tracker-detail.component';
import { TrackerOverviewComponent } from './tracker/tracker-overview/tracker-overview.component';
import { UnitTypeAddComponent } from './unittype/unit-type-add/unit-type-add.component';
import { UnitTypeDetailComponent } from './unittype/unit-type-detail/unit-type-detail.component';
import { UnitTypeOverviewComponent } from './unittype/unit-type-overview/unit-type-overview.component';


export class RoutingData {
  name: String
  url: String
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trackers', 
    data: { breadcrumb: 'Trackers' },
    children: [
      { path: '', 
        redirectTo: 'overview', 
        pathMatch: 'full'
      },
      { path: 'add',
        component: TrackerAddComponent
      },
      { path: 'detail/:id',
        component: TrackerDetailComponent
      },
      { path: 'overview', 
        component: TrackerOverviewComponent,
        data: { breadcrumb :  'Overview' } 
      }
    ]
  },
  { path: 'unittypes',
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'add', component: UnitTypeAddComponent },
      { path: 'detail/:id', component: UnitTypeDetailComponent },
      { path: 'overview', component: UnitTypeOverviewComponent }
    ]
  },
  { 
    path: '**', 
    component: NotFoundPageComponent ,
    data: { breadcrumb: 'Not found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
