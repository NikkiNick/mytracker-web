import { Component, Input, OnInit } from '@angular/core';
import { Tracker } from '../../tracker.model';

@Component({
  selector: 'app-record-panel',
  templateUrl: './record-panel.component.html',
  styleUrls: ['./record-panel.component.scss']
})
export class RecordPanelComponent implements OnInit {

  @Input() tracker: Tracker;

  constructor() { }

  ngOnInit(): void {
  }

}
