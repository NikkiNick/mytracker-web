import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { SharedModule } from '../shared/shared.module';
import { UserService } from './user.service';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserManipulationDialogComponent } from './dialogs/user-manipulation-dialog/user-manipulation-dialog.component';
import { User } from './user.model';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
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
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    UserManipulationDialogComponent
  ],
  imports: [
    SharedModule,
    AuthModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    {
      provide: 'UserServiceConfig',
      useValue: {
        model: User,
        apiUrl: 'http://localhost:54980/api'
      }
    },
    UserService ]
})

export class UserModule { }
