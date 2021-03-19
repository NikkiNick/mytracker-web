import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuItems: { name: String, url: String }[] = [
    { name: "Home", url: "" },
    { name: "Trackers", url: "/trackers" }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
