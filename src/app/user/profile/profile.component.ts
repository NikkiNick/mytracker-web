import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserAddComponent } from '../user-add/user-add.component';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  authenticatedUser: User;
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private snackbarService: SnackBarService,
    private dialog: MatDialog,
    private router: Router) { 
    this.form = this.fb.group({
      firstName: [ , []],
      lastName: [, []]
    });
    this.userService.getAuthenticatedUser().subscribe(
      (user) => this.authenticatedUser = user,
      (err) => this.snackbarService.showHttpError(err, $localize`:@@user:User`+" ")
    )
  }

  ngOnInit(): void {

  }

  editUser() {
    this.dialog.closeAll();
    this.dialog.open(UserAddComponent, { data: { model: this.authenticatedUser, navigateTo: this.router.url } });
  }

  changePassword(){
    this.dialog.closeAll();
    this.dialog.open(ChangePasswordComponent, { data: { model: this.authenticatedUser, navigateTo: this.router.url } });
  }

}
