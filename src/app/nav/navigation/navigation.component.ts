import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
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
    { name: $localize`:@@nav-home:Home`, url: '/' },
    { name: $localize`:@@nav-trackers:Trackers`, url: '/trackers' },
    { name: $localize`:@@nav-budgetTrackers:BudgetTrackers`, url: '/budget-trackers' }
  ];
  isAuthenticated$: Observable<boolean>;
  authenticatedUser?: User;
  form: FormGroup;
  activeRoute: string;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackbarService: SnackBarService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.isAuthenticated$ = this.authService.isAuthenticated.asObservable();
    this.form = this.fb.group({
      email: [, [ Validators.required, Validators.email ]],
      password: [, [Validators.required]]
    });
    this.userService.getAuthenticatedUser().subscribe(
      (res) => this.authenticatedUser = res,
      (err) => this.snackbarService.showHttpError(err, $localize`:@@user:User` + ' ')
    );
    this.router.events
      .subscribe((event) => {
        if(event instanceof NavigationEnd){
          const urlSegments = event.url.split("/");
          if(urlSegments[0] === ""){
            urlSegments.shift();
          }
          this.activeRoute = `/${urlSegments[0]}`;
        }
    });
  }

  logOut(): void {
    this.authService.logOut();
  }
}
