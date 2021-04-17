import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { SnackBarService } from '../../shared/snackbar/snack-bar.service';
import { User } from '../../user/user.model';
import { UserService } from '../../user/user.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  menuItems: { name: string, url: string }[] = [
      { name: $localize`:@@nav-home:Home`, url: '' },
      { name: $localize`:@@nav-trackers:Trackers`, url: '/trackers' },
      { name: $localize`:@@nav-unittypes:Unittypes`, url: '/unittypes' }
  ];
  isAuthenticated: Observable<boolean>;
  authenticatedUser?: User;
  form: FormGroup;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackBarService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated$;
    this.form = this.fb.group({
      email: [, [ Validators.required, Validators.email ]],
      password: [, [Validators.required]]
    });
    this.userService.getAuthenticatedUser().subscribe(
      (res) => this.authenticatedUser = res,
      (err) => this.snackbarService.showHttpError(err, $localize`:@@user:User` + ' ')
    );
  }

  logout() {
    this.authService.logOut();
  }
}
