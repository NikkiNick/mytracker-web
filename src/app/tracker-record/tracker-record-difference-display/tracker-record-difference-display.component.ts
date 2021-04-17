import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import differenceInDays from 'date-fns/differenceInDays';
import { Tracker } from 'src/app/tracker/tracker.model';
import { TrackerRecord, TrackerRecordDifference } from '../tracker-record.model';

@Component({
    selector: 'app-tracker-record-difference-display',
    templateUrl: './tracker-record-difference-display.component.html',
    styleUrls: ['./tracker-record-difference-display.component.scss']
})
export class TrackerRecordDifferenceDisplayComponent implements OnInit, OnChanges {
  @Input() firstRecord: TrackerRecord;
  @Input() secondRecord: TrackerRecord;
  @Input() tracker: Tracker;
  @Input() smallSize = true;
  difference: TrackerRecordDifference;

  constructor() {

  }

  ngOnInit(): void {
      this.difference = TrackerRecord.calculateDifference(this.firstRecord, this.secondRecord);
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes.firstRecord && changes.firstRecord.currentValue !== changes.firstRecord.previousValue) {
        this.difference = TrackerRecord.calculateDifference(this.firstRecord, this.secondRecord);
      }
      if (changes.secondRecord && changes.secondRecord.currentValue !== changes.secondRecord.previousValue) {
        this.difference = TrackerRecord.calculateDifference(this.firstRecord, this.secondRecord);
      }
  }

  dayDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      if (this.difference.dayDiff > 0) {
          color = 'green';
          prefix = '+';
      } else if (this.difference.dayDiff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: this.difference.dayDiff };
  }

  amountDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      if (this.difference.amountDiff > 0) {
          color = 'green';
          prefix = '+';
      } else if (this.difference.amountDiff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: this.difference.amountDiff.toFixed(this.tracker.recordPrecision) as unknown as number };
  }
  averageDifference(): { prefix: string, color: string, difference: number } {
      let prefix = '';
      let color = 'black';
      if (this.difference.averageDiff > 0) {
          color = 'green';
          prefix = '+';
      } else if (this.difference.averageDiff < 0) {
          color = 'red';
      }
      return { prefix, color, difference: this.difference.averageDiff.toFixed(this.tracker.recordPrecision) as unknown as number };
  }
}
