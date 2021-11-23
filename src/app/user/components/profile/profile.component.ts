import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { UserManipulationDialogComponent } from '../../dialogs/user-manipulation-dialog/user-manipulation-dialog.component';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  authenticatedUser: User;

  constructor(
    private userService: UserService,
    private snackbarService: SnackBarService,
    private dialog: MatDialog,
    private router: Router) {
    this.userService.getAuthenticatedUser().subscribe(
      (user) => this.authenticatedUser = user,
      (err) => { 
		  console.log(err);
		  this.snackbarService.showHttpError(err, $localize`:@@user:User` + ' ');
	  }
    );
  }

  openDialog_editUser() {
    this.dialog.closeAll();
    this.dialog.open(UserManipulationDialogComponent, { data: { modelId: this.authenticatedUser.id } as ManipulationDialogData});
  }

  openDialog_changePassword() {
    this.dialog.closeAll();
    this.dialog.open(ChangePasswordComponent, { data: { model: this.authenticatedUser, navigateTo: this.router.url } });
  }

}
