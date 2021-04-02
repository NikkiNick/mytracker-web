import { Component, Input, OnInit } from '@angular/core';
import differenceInDays from 'date-fns/differenceInDays';
import { Tracker } from 'src/app/tracker/tracker.model';
import { TrackerRecord } from '../tracker-record.model';

@Component({
    selector: 'app-tracker-record-difference-display',
    templateUrl: './tracker-record-difference-display.component.html',
    styleUrls: ['./tracker-record-difference-display.component.scss']
})
export class TrackerRecordDifferenceDisplayComponent implements OnInit {
  @Input() firstRecord: TrackerRecord;
  @Input() secondRecord: TrackerRecord;
  @Input() tracker: Tracker;
  @Input() smallSize = true;

  constructor() { }

  ngOnInit(): void {
  }

  dayDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      const diff = differenceInDays(new Date(this.firstRecord.date), new Date(this.secondRecord.date));
      if (diff > 0) {
          color = 'green';
          prefix = '+';
      } else if (diff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: diff };
  }

  amountDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      const diff = this.firstRecord.amount - this.secondRecord.amount;
      if (diff > 0) {
          color = 'green';
          prefix = '+';
      } else if (diff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: diff };
  }
  averageDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      let diff;
      if (this.dayDifference().difference === 0) {
          diff = this.amountDifference().difference.toFixed(this.tracker.recordPrecision) as unknown as number;
      } else {
          diff = (this.amountDifference().difference / this.dayDifference().difference).toFixed(this.tracker.recordPrecision) as unknown as number;
      }
      if (diff > 0) {
          color = 'green';
          prefix = '+';
      } else if (diff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: diff };
  }
}
