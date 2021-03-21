import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tracker-main',
  templateUrl: './tracker-main.component.html',
  styleUrls: ['./tracker-main.component.scss']
})
export class TrackerMainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
