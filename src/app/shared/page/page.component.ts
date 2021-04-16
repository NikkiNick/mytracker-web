import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() title: string;
  @Input() showTitleDivider?: boolean = true;
  @Input() showBreadcrumbs?: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
