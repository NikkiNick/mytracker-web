import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  isEdit: boolean = false;
  form: FormGroup;
  currentUser: User;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserAddComponent>,
    private snackbarService: SnackBarService,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { model?: User, navigateTo?: string }) { 
      if (data.model !== null) {
        this.isEdit = true;
        this.currentUser = data.model;
      } else {
          this.currentUser = new User();
      }
  
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        firstName: [ this.currentUser.firstName, [ Validators.required ] ],
        lastName: [ this.currentUser.lastName, [ Validators.required ] ],
        email: [ this.currentUser.email, [ Validators.required, Validators.email ] ]
      });
    }
    onSubmit() {
      if (this.form.valid) {
          this.currentUser.firstName = this.form.get('firstName').value;
          this.currentUser.lastName = this.form.get('lastName').value;
          this.currentUser.email = this.form.get('email').value;
          if (this.isEdit) {
              this.userService.update(this.currentUser).subscribe(
                  () => {
                      this.snackbarService.show($localize`:@@user-updated:User updated`+' ');
                      this.router.navigateByUrl(this.data.navigateTo);
                  },
                  (err) => this.snackbarService.showHttpError(err, $localize`:@@user:User`+' ')
              );
          } else {
              this.userService.insert(this.currentUser).subscribe(
                  () => {
                      this.snackbarService.show($localize`:@@user-updated:User added`+' ');
                      this.router.navigateByUrl(this.data.navigateTo);
                  },
                  (err) => this.snackbarService.showHttpError(err, $localize`:@@user:User`+' ')
              );
          }
          this.closeDialog();
      }
  }

  closeDialog() {
      this.dialogRef.close();
  }

}
