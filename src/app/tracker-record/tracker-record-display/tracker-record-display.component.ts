import { Component, Input, OnInit } from '@angular/core';
import { TrackerRecord } from '../tracker-record.model';

@Component({
  selector: 'app-tracker-record-display',
  templateUrl: './tracker-record-display.component.html',
  styleUrls: ['./tracker-record-display.component.scss']
})
export class TrackerRecordDisplayComponent implements OnInit {

  @Input() record: TrackerRecord;
  @Input() suffix?: String;
  @Input() color?: String;

  constructor() { }

  ngOnInit(): void {
  }

}
