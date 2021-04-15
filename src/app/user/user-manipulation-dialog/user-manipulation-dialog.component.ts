import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ManipulationDialogData } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog-data.model';
import { ManipulationDialogComponent } from 'src/app/shared/crud/manipulation-dialog/manipulation-dialog.component';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-manipulation-dialog',
  templateUrl: './user-manipulation-dialog.component.html',
  styleUrls: ['./user-manipulation-dialog.component.scss']
})
export class UserManipulationDialogComponent extends ManipulationDialogComponent<User> {

  form: FormGroup;

  constructor(
    public userService: UserService,
    public router : Router,
    public snackbarService: SnackBarService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserManipulationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ManipulationDialogData) {
      super(router, snackbarService, dialogRef, data);
      this.service = userService;
      this.form = this.fb.group({
        firstName: [ , [ Validators.required ] ],
        lastName: [ , [ Validators.required ] ],
        email: [ , [ Validators.required, Validators.email ] ]
      });
    }
}
