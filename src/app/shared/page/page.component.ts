import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() title: string;
  @Input() showTitleDivider = true;
  @Input() showBreadcrumbs = false;

  constructor() { }

  ngOnInit(): void {
  }

}
