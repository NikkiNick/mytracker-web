import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentUser: User;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbarService: SnackBarService,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { model?: User, navigateTo?: string }) {
      this.currentUser = data.model;
     }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: [ , [ Validators.required ] ],
      newPassword: [ , [ Validators.required ] ],
      newPasswordConfirm: [ , [ Validators.required, Validators.required ] ]
    }, { validators: [ this.passwordValidator ] })
  }
  onSubmit() {
    if (this.form.valid) {
      const oldPassword = this.form.get("oldPassword").value;
      const newPassword = this.form.get("newPassword").value;
        this.userService.updatePassword(oldPassword, newPassword).subscribe(
          (res) => {
            this.router.navigateByUrl(this.data.navigateTo);
            this.closeDialog();
          },
          (err: HttpErrorResponse) => {
            if(err.status === 413){
              this.form.get("oldPassword").setErrors({ oldPasswordNotCorrect: true});
            }
            else{
              this.snackbarService.showHttpError(err, "Password ");
              this.closeDialog();
            }
          }
        );
    }
  }

  closeDialog() {
      this.dialogRef.close();
  }
  passwordValidator: ValidatorFn = (fg: FormGroup) => {
    const newPassword: string = fg.get('newPassword').value;
    const newPasswordConfirm: string = fg.get('newPasswordConfirm').value;

    //fg.get('newPassword').setErrors(null);
    //fg.get('newPasswordConfirm').setErrors(null);

    return newPasswordConfirm !== null && newPassword !== null && newPassword === newPasswordConfirm ? null : { nonEqualPasswords: true };

  }
}
