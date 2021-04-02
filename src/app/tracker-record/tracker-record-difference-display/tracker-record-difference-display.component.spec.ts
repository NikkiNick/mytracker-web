import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackerRecordDifferenceDisplayComponent } from './tracker-record-difference-display.component';

describe('TrackerRecordDifferenceDisplayComponent', () => {
  let component: TrackerRecordDifferenceDisplayComponent;
  let fixture: ComponentFixture<TrackerRecordDifferenceDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerRecordDifferenceDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackerRecordDifferenceDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
