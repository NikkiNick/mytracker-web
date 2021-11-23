import { Component, Input } from '@angular/core';
import { TrackerRecord } from '../tracker-record.model';

@Component({
  selector: 'app-tracker-record-display',
  templateUrl: './tracker-record-display.component.html',
  styleUrls: ['./tracker-record-display.component.scss']
})
export class TrackerRecordDisplayComponent {
    @Input() record: TrackerRecord;
    @Input() suffix?: string;
    @Input() color?: string;
}
