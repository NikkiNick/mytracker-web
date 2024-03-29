import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/auth/auth-response.model';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackBarService } from 'src/app/shared/snackbar/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  form: FormGroup;
  prevUrl: string;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackbarService: SnackBarService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: [, [ Validators.required, Validators.email ] ],
      password: [, [ Validators.required ] ]
    });
  }

  login(): void {
    if (this.form.valid) {
      const email = this.form.get('email').value;
      const password = this.form.get('password').value;
      this.authService.authenticate(email, password).subscribe(
        (res: AuthResponse) => {
          this.authService.setToken(res.token);
          this.router.navigateByUrl(this.authService.attemtedUrlBeforeLoginRedirect);
        },
        (err) => this.snackbarService.showHttpError(err, $localize`:@@user-login:Login` + ' ')
      );
    }
  }
}