import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent  {
    @Input() deliminator = '>';
    breadcrumbs: Array<{ label: string; url: string}> = [];

    constructor(private router: Router, private route: ActivatedRoute) {
      this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
          let currentRoute = this.route.root;
          let url = '';
          do {
            const childrenRoutes = currentRoute.children;
            currentRoute = null;
            childrenRoutes.forEach((r: ActivatedRoute) => {
              if (r.outlet === 'primary') {
                const routeSnapshot = r.snapshot;
                url += '/' + routeSnapshot.url.map((segment) => segment.path).join('/');
                this.breadcrumbs.push({
                  label: r.snapshot.data.breadCrumb,
                  url
                });
                currentRoute = r;
              }
            });
          } while (currentRoute);
        });
    }
}
