import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthModule } from '../auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user.service';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserManipulationDialogComponent } from './user-manipulation-dialog/user-manipulation-dialog.component';
import { User } from './user.model';

@NgModule({
  declarations: [
    LoginComponent,
    ProfileComponent,
    ChangePasswordComponent,
    UserManipulationDialogComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    SharedModule
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
