import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-bread-crumbs',
    templateUrl: './bread-crumbs.component.html',
    styleUrls: ['./bread-crumbs.component.scss']
})
export class BreadCrumbsComponent implements OnInit {
    @Input() deliminator = '>';
    breadcrumbs: Array<{ label: string; url: string}>;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
                this.breadcrumbs = [];
                let currentRoute = this.route.root;
                let url = '';
                do {
                    const childrenRoutes = currentRoute.children;
                    currentRoute = null;
                    childrenRoutes.forEach((route) => {
                        if (route.outlet === 'primary') {
                            const routeSnapshot = route.snapshot;
                            url += '/' + routeSnapshot.url.map((segment) => segment.path).join('/');
                            this.breadcrumbs.push({
                                label: route.snapshot.data.breadcrumb,
                                url
                            });
                            currentRoute = route;
                        }
                    });
                } while (currentRoute);
            });
    }
}
